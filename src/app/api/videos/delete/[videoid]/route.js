import Videos from "@models/videos";
import { connectToDB } from "@utils/database";
import mongoose from "mongoose";

export const DELETE = async (request, context) => {
    try {
        await connectToDB();

        const videoId = new mongoose.Types.ObjectId(context.params.videoid);
        
        await Videos.deleteOne(videoId);
        
        return new Response(JSON.stringify({ message: "Video deleted successfully" }), {
            status: 200
        });
    } catch (error) {
        console.log(error);
        return new Response("Failed to delete video", {
            status: 500
        })
    }
}
