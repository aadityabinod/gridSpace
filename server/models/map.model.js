import mongoose from "mongoose";

const mapSchema = new mongoose.Schema({
    name:{
        type: String,
        default: "unnamed"
    },
    width:{
        type: Number,
        required: true,
    },
    height:{
        type: Number,
        required: true,
    },
    mapElements:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "MapElement"
    }],
    capacity:{
        type: Number,
        required: true
    },
    type:{
        type: String,
        enum: ["office", "conference"],
    }

})

const Map = new mongoose.model("Map", mapSchema);
export default Map;