import Questions from "@models/questions";
import Responses from "@models/responses";
import User from "@models/user";
import Videos from "@models/videos";
import { connectToDB } from "@utils/database";
import mergeQuestionResponse from "@utils/mergeQuestionResponse";
import mongoose from "mongoose";

export const GET = async (request, context) => {

    const videoId = new mongoose.Types.ObjectId(context.params.videoid);

    try {
        await connectToDB();

        const questions = await Questions.find({ videoid: videoId })
            .select("question options");

        const responses = await Responses.find({ videoid: videoId })
            .select("response.questionid response.options");

        const processedResponse = await mergeQuestionResponse(questions, responses);

        return new Response(JSON.stringify(processedResponse), {
            status: 200
        })
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch responses", {
            status: 500
        })
    }
}