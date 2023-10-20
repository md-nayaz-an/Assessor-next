import Questions from "@models/questions";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const questions = await request.json();

    console.log(questions);

    try {
        await connectToDB();
        const questionPromises = questions.map(async (question) => {
            // Create a copy of the question object without the localId field
            const { localId, ...questionWithoutLocalId } = question;
      
            const newQuestion = new Questions(question);
            return await newQuestion.save();
          });
      
          const savedQuestions = await Promise.all(questionPromises);
      
          return new Response(JSON.stringify(savedQuestions), { status: 201 });
    } catch (error) {
        return new Response("Failed to save the Questions", { status: 500 });
    }
}