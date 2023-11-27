import Responses from "@models/responses";
import { connectToDB } from "@utils/database";
import mongoose from "mongoose";

export const GET = async (request, context) => {
    try {
        await connectToDB();

        const responseId = new mongoose.Types.ObjectId(context.params.responseid);

        const responses = await Responses.findOne({_id: responseId});

        return new Response(JSON.stringify(responses), {
            status: 200
        })
    } catch (error) {
        return new Response("Failed to fetch responses", {
            status: 500
        })
    }
}
