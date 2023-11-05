import Responses from "@models/responses";
import Videos from "@models/videos";
import Questions from "@models/questions";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {

    try {
        await connectToDB();

        const responses = await Responses.find({})
            .populate('videoid')
            .populate('response.questionid')
            .sort({ timestamp: -1 });

        return new Response(JSON.stringify(responses), { status: 200});
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch the responses", { status: 500 });
    }
}