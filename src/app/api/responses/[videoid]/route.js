import Responses from "@models/responses";
import { connectToDB } from "@utils/database";
import mongoose from "mongoose";

export const GET = async (request, context) => {
    try {
        await connectToDB();

        const videoId = new mongoose.Types.ObjectId(context.params.videoid);

        const responses = await Responses.find({videoid: videoId}).sort({ timestamp: 1 });
        
        return new Response(JSON.stringify(responses), {
            status: 200
        })
    } catch (error) {
        return new Response("Failed to fetch responses", {
            status: 500
        })
    }
}
