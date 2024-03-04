export const questionListTransform = async (rawQuestions) => {
    const transformedQuestions = [];

    rawQuestions.forEach(question => {
        const mainQuestion = {
            "_id": question._id,
            "videoid": question.videoid,
            "timestamp": question.timestamp,
            "question": question.question,
            "sliderquestion": question.sliderquestion,
            "options": question.options,
            "title": question.title,
            "summary": question.summary,
            "type": "question"
        };

        transformedQuestions.push(mainQuestion);

        if (question.followUps && question.followUps.length > 0) {
            question.followUps.forEach(followUp => {
                if (followUp.showBet) {
                    const betQuestion = {
                        "_id": question._id,
                        "videoid": question.videoid,
                        "question": question.question,
                        "betQuestion": followUp.betQuestion,
                        "points": followUp.points,
                        "gain": followUp.gain,
                        "loss": followUp.loss,
                        "penalty": followUp.penalty,
                        "duration": followUp.duration,
                        "timestamp": followUp.popup,
                        "type": "bet"
                    };
                    transformedQuestions.push(betQuestion);
                }

                if (followUp.showRevision) {
                    const reviseQuestion = {
                        "_id": question._id,
                        "videoid": question.videoid,
                        "timestamp": followUp.revisePopup,
                        "question": question.question,
                        "sliderquestion": question.sliderquestion,
                        "options": question.options,
                        "title": question.title,
                        "summary": question.summary,
                        "type": "revise"
                    };
                    transformedQuestions.push(reviseQuestion);
                }
            });
        }
    });

    transformedQuestions.sort((a, b) => a.timestamp - b.timestamp);

    //console.log(transformedQuestions);

    return transformedQuestions;
}
