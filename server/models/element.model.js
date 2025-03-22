import mongoose from "mongoose";

const elementSchema = new mongoose.Schema({
    width:{
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true
    },
    imageUrl:{
        type: String,
        required: true,
        unique: true
    }
})

const Element = new mongoose.model("Element", elementSchema );
export default Element;