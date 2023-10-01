import mongoose, { Schema, models, model} from "mongoose";

const QuestionSchema = new Schema ({
    videoid: {
        type: Schema.Types.ObjectId,
        ref: 'Videos'
    },
    timestamp: {
        type: Number,
    },
    question: {
        type: String,
    },
    options: {
        type: Array,
    },
    title: {
        type: String,
    },
    summary: {
        type: String,
    }
})

const Questions = models.Questions || model('Questions', QuestionSchema);

export default Questions;