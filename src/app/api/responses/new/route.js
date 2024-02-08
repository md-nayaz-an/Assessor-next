import Questions from "@models/questions";
import Responses from "@models/responses";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const questionResponse = await request.json();

    //console.log(questionResponse);

    try {
        await connectToDB();
        processResponse(questionResponse)
/*        const newResponse = new Responses({
            videoid: questionResponse.videoId,
            ...questionResponse
        })
        await newResponse.save();
*/
        return new Response(JSON.stringify({}), { status: 201});
    } catch (error) {
        console.error(error);
        return new Response("Failed to save the response", { status: 500 });
    }
}

async function processResponse(responses) {
    await connectToDB();
    let user = null;

    for (const resp of responses.response) {
        if(resp.options.length > 1 && resp.options[1] !== 1) { //"NO BET"

            const questionId = resp.questionid;
            const question = await Questions.findOne({ '_id': questionId });

            if(!user)
                user = await User.findOne({ '_id' : responses.userid});

            if (question && question.followUps.length !== 0) {
                const correctOption = question.options.find((option) => option.isCorrect === true);
                const userOption = resp.options[2] === -1 ? resp.options[0] : resp.options[2];

                let betPoints = question.followUps[0].points;
                let userPoints = user.points || 0;


                const penalty = question.followUps[0].penalty;
                const gain = question.followUps[0].gain;
                const loss = question.followUps[0].loss;
                const betOption = resp.options[1];

                console.log("user points", userPoints);
                console.log("user option", userOption);
                console.log("corr option", correctOption);
                if(betOption === -1) {
                    console.log(`User missed to answer! penalty ${penalty} points`);
                } else {
                    if(userOption === correctOption.optionId)
                        console.log(`User gain ${gain} points`);
                    else
                        console.log(`User loss ${loss} points`);
                }
            }
        }
    }
}