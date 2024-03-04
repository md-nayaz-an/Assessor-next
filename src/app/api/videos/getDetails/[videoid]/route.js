import Questions from "@models/questions";
import Videos from "@models/videos";
import { connectToDB } from "@utils/database";
import mongoose from "mongoose";

export const GET = async (request, context) => {
    try {
        await connectToDB();

        const videoId = new mongoose.Types.ObjectId(context.params.videoid);
        
        const video = await Videos.findOne({_id: videoId})
        .select("title url");

        const questions = await Questions.find({ videoid: videoId })
        .select("timestamp question sliderquestion options")
        .sort({ timestamp: 1 });
        
        return new Response(JSON.stringify({ video, questions }), {
            status: 200
        })
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch questions", {
            status: 500
        })
    }
}