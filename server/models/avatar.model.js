import mongoose from "mongoose";

const avatarSchema = new mongoose.Schema ({
    imageUrl:{
        type: String,
        unique: true
    },
    name:{
        type: String
    }
})

const Avatar= mongoose.model("Avatar", avatarSchema);
export default Avatar;