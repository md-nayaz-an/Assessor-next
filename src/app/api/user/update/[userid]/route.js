import User from "@models/user";
import { connectToDB } from "@utils/database";
import mongoose from "mongoose";

export const PATCH = async (request, context) => {
    const data = await request.json();
    const userId = new mongoose.Types.ObjectId(context.params.userid);

    try {
        await connectToDB();
        const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true });

        return new Response(JSON.stringify(updatedUser), { status: 201});
    } catch (error) {
        return new Response("Failed to save the response", { status: 500 });
    }
}