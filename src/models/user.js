import mongoose, { Schema, models, model} from "mongoose";

const UserSchema = new Schema ({
    email: {
        type: String,
    },
    name: {
        type: String,
    },
    role: {
        type: String
    },
    image: {
        type: String,
    }
})

const User = models.User || model('User', UserSchema);

export default User;