import Questions from "@models/questions";
import { connectToDB } from "@utils/database";
import mongoose from "mongoose";

export const GET = async (request, context) => {
    try {
        await connectToDB();

        const videoId = new mongoose.Types.ObjectId(context.params.videoid);
        
        const questions = await Questions.find({ videoid: videoId }).sort({ timestamp: 1 });

        return new Response(JSON.stringify(questions), {
            status: 200
        })
    } catch (error) {
        return new Response("Failed to fetch questions", {
            status: 500
        })
    }
}