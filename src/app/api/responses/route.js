import Responses from "@models/responses";
import Videos from "@models/videos";
import Questions from "@models/questions";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get('page')
    const perPage = searchParams.get('perPage')

    try {
        await connectToDB();

        let totalCount = await Responses.countDocuments();
        let totalPages = 1;
        if(page && perPage)
            totalPages = Math.ceil(totalCount / perPage);

        const responses = await Responses.find({})
        .populate({
            path: 'videoid',
            select: '_id title'
        })
        .populate({
            path: 'userid',
            select: '_id name email'
        })
        .select('_id timestamp userid videoid name mail')
        .sort({ timestamp: -1 })
        .skip((page - 1) * perPage)
        .limit(perPage);

        return new Response(JSON.stringify({
            responses,
            totalCount,
            totalPages,
            page,
            perPage
        }), { status: 200});
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch the responses", { status: 500 });
    }
}