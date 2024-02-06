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
    // resolve default by providing edit option!! 
    sliderquestion: {
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
    },
    bets: {
        type: Array,
    }
})

const Questions = models.Questions || model('Questions', QuestionSchema);

export default Questions;