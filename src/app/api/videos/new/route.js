import Videos from "@models/videos";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const videosDetails = await request.json();

    console.log(videosDetails);

    try {
        await connectToDB();
        const newVideo = new Videos(videosDetails);
        await newVideo.save();
        
        return new Response(JSON.stringify(newVideo), { status: 201});
    } catch (error) {
        return new Response("Failed to save the response", { status: 500 });
    }
}