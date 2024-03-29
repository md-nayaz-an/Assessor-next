import mongoose, { Schema, models, model } from "mongoose";

const ResponseSchema = new Schema ({
    videoid: {
        type: Schema.Types.ObjectId,
        ref: 'Videos'
    },
    name : {
        type: String,
    },
    mail: {
        type: String,
    },
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    timestamp: {
        type: Number,
    },
    response: [{
        questionid: {
            type: Schema.Types.ObjectId,
            ref: 'Questions'
        },
        options: {
            type: Array,
        },
        status: {
            type: Number,
        },
        thoughts: {
            type: String,
        },
        probability: {
            type: Number,
        },
    }]
})

const Responses = models.Responses || model('Responses', ResponseSchema);

export default Responses;