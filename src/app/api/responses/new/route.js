import Questions from "@models/questions";
import Responses from "@models/responses";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const questionResponse = await request.json();

    //console.log(questionResponse);

    try {
        await connectToDB();

        const newResponse = new Responses({
            videoid: questionResponse.videoId,
            ...questionResponse
        })
        await newResponse.save();

        await processResponse(questionResponse);

        const userUpdate = await User.findOne({ "_id" :questionResponse.userid }, "points")

        return new Response(JSON.stringify({
            "_id": newResponse._id,
            userUpdate
        }), { status: 201});
    } catch (error) {
        console.error(error);
        return new Response("Failed to save the response", { status: 500 });
    }
}

async function processResponse(responses) {
    try {
        await connectToDB();
        let user = null;
        const userId = responses.userid;

        for (const resp of responses.response) {
            if(resp.options.length > 1 && resp.options[1] !== 1) { //"YES BET"

                const questionId = resp.questionid;
                const question = await Questions.findOne({ '_id': questionId });

                if(!user)
                    user = await User.findOne({ '_id' : userId});

                if (question && question.followUps.length !== 0) {
                    const correctOption = question.options.find((option) => option.isCorrect === true);
                    const userOption = (resp.options[2] && resp.options[2] === -1) ? resp.options[0] : resp.options[2];

                    let betPoints = question.followUps[0].points;
                    let userPoints = user.points || 0;


                    const penalty = question.followUps[0].penalty;
                    const gain = question.followUps[0].gain;
                    const loss = question.followUps[0].loss;
                    const betOption = resp.options[1];

                    //console.log("user points", userPoints);
                    //console.log("bet points", betPoints);
                    //console.log("penalty", penalty);
                    //console.log("gain", gain);
                    //console.log("loss", loss);

                    //console.log("user option", userOption);
                    //console.log("corr option", correctOption);
                    if(betOption === -1) {
                        userPoints -= penalty;
                        //console.log(`User penalty ${userPoints} points`);
                    } else {
                        if(userOption === correctOption.optionId) {
                            userPoints += betPoints * gain
                            //console.log(`User gain ${userPoints} points`);
                        }
                        else {
                            userPoints -= betPoints * loss
                            //console.log(`User loss ${userPoints} points`);
                        }
                    }

                    await User.findOneAndUpdate(
                        { _id: userId }, // Query criteria (assuming userId is the user's _id)
                        { $set: { points: userPoints } }, // Update the points field
                        { new: true } // Return the updated document
                    );
                }
            }
        }
    } catch (err) {
        throw(err);
    }
}