import mongoose from "mongoose";
import argon2 from "argon2";

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    avatar:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Avatar",
        required: true
    }

},{
    timestamps: true
});

UserSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }

    try {
        this.password = await argon2.hash(this.password);
        next();
    } catch (error) {
        next(error);
    }
}) 


const User = mongoose.model("User", UserSchema);
export default User;