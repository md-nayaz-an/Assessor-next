import mongoose, { Schema, models, model} from "mongoose";
import Questions from "./questions";

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
    adminid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

/*
VideoSchema.pre('deleteOne', async function(next) {
    try {
        console.log(this.getQuery()._id);
        await Questions.deleteMany({ videoid: this.getQuery()._id });
        next();
    } catch (error) {
        next(error);
    }
});
*/

const Videos = models.Videos || model('Videos', VideoSchema);

export default Videos;