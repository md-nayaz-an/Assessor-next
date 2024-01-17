import Videos from "@models/videos";
import mongoose from "mongoose";
import { DELETE } from "../src/app/api/videos/delete/[videoid]/route";
import Questions from "@models/questions";
import { connectToDB } from "@utils/database";


describe('DELETE Function', () => {
    beforeAll(async () => {
        await connectToDB();
    });

    it('should delete a video and its associated questions', async () => {
        const testVideo = new Videos({
            title: "Test Video",
            url: "https://youtu.be/s8NWNIGObjU?si=As8M3RCk4_BTkJfm",
            description: "Test Description",
        });

        await testVideo.save();

        const testQuestion = {
            videoid: testVideo._id,
            timestamp: Date.now(),
            question: "Test Question",
            options: ["Option 1", "Option 2"],
            title: "Test Title",
            summary: "Test Summary",
        };

        console.log(testVideo);
        // Save the test question
        await Questions.create(testQuestion);

        // Simulate a request to the DELETE function
        const response = await DELETE({}, { params: { videoid: testVideo._id } }, {});

        // Check if the response is as expected
        expect(response.status).toBe(200);

        // Check if the video and associated questions are deleted
        const deletedVideo = await Videos.findById(testVideo._id);
        const deletedQuestion = await Questions.findOne({ videoid: testVideo._id });

        expect(deletedVideo).toBeNull();
        expect(deletedQuestion).toBeNull();
    });

    afterAll(async () => {
        // Disconnect from the database after running tests
        await mongoose.connection.close();
    });
});
