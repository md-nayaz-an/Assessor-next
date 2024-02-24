import Responses from "@models/responses";
import Videos from "@models/videos";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB();

        const videoResponseCount = await Responses.aggregate([
            {
                $group: {
                    _id: "$videoid",
                    responseCount: { $sum: 1 },
                },
            },
        ]);

        const videoDetails = await Videos.populate(videoResponseCount, {
            path: "_id",
            model: "Videos",
        });

        const filteredVideoDetails = videoDetails.filter((detail) => detail._id !== null);

        return new Response(JSON.stringify(filteredVideoDetails), {
            status: 200,
        });
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch all videos", {
            status: 500
        })
    }
}