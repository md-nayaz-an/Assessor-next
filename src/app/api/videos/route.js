import Videos from "@models/videos";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB();

        const videos = await Videos.find({});
        console.log(videos)
        return new Response(JSON.stringify(videos), {
            status: 200,
            headers: {
                'Cache-Control': 'public, s-maxage=1',
                'CDN-Cache-Control': 'public, s-maxage=60',
                'Vercel-CDN-Cache-Control': 'public, s-maxage=60',
            },
        })
    } catch (error) {
        return new Response("Failed to fetch all videos", {
            status: 500
        })
    }
}