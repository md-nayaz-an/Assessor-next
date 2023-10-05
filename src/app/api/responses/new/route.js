import Responses from "@models/responses";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const questionResponse = await request.json();

    console.log(questionResponse);

    try {
        await connectToDB();
        const newResponse = new Responses({
            videoid: questionResponse.videoId,
            ...questionResponse
        })
        await newResponse.save();
        
        return new Response(JSON.stringify(newResponse), { status: 201});
    } catch (error) {
        return new Response("Failed to save the response", { status: 500 });
    }
}