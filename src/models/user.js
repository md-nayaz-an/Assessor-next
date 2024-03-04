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
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
    },
    phone: {
        type: String,
    },
    usn: {
        type: String,
    },
    points: {
        type: Number,
    }
})

const User = models.User || model('User', UserSchema);

export default User;