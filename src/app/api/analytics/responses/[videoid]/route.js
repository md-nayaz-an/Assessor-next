import Questions from "@models/questions";
import Responses from "@models/responses";
import User from "@models/user";
import Videos from "@models/videos";
import { connectToDB } from "@utils/database";
import mongoose from "mongoose";

export const GET = async (request, context) => {
    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get('page')
    const perPage = searchParams.get('perPage')

    try {
        await connectToDB();

        const videoId = new mongoose.Types.ObjectId(context.params.videoid);

/*        const video = await Videos.findOne({_id: videoId})
        .select("title url");

        const questions = await Questions.find({ videoid: videoId })
        .select("timestamp question sliderquestion options")
        .sort({ timestamp: 1 });
*/
        let totalCount = await Responses.countDocuments({ videoid: videoId});
        let totalPages = 1;

        if(page && perPage)
            totalPages = Math.ceil(totalCount / perPage);

        const responses = await Responses.find({ videoid: videoId })
        .populate({
            path: 'userid',
            select: '_id name email points age gender phone usn'
        })
        .select("timestamp response.questionid response.options response.thoughts response.probability")
        .sort({ timestamp: -1 })
        .skip((page - 1) * perPage)
        .limit(perPage);;

        return new Response(JSON.stringify({
            responses,
            totalCount,
            totalPages,
            page,
            perPage
        }), {
            status: 200
        })
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch responses", {
            status: 500
        })
    }
}