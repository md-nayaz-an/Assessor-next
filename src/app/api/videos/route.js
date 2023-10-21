import Videos from "@models/videos";
import { connectToDB } from "@utils/database";

export const dynamic = 'force-dynamic';
export const GET = async (request) => {
    try {
        await connectToDB();

        const videos = await Videos.find({});
        console.log(videos)
        return new Response(JSON.stringify(videos), {
            status: 200,
        })
    } catch (error) {
        return new Response("Failed to fetch all videos", {
            status: 500
        })
    }
}