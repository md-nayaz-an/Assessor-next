import mongoose, { Schema, models, model} from "mongoose";

const VideoSchema = new Schema ({
    title: {
        type: String,
    },
    url: {
        type: String,
    }, 
    description: {
        type: String,
    },
})

const Videos = models.Videos || model('Videos', VideoSchema);

export default Videos;