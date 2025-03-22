import mongoose from "mongoose";


const mapElementSchema = new mongoose.Schema({
    x:{
        type: Number,
        required: true,
    },
    y:{
        type: Number,
        required: true,
    },
    elementId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Element"
    },
    mapId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Map"
    }
})

const MapElement = new mongoose.model("MapElement", mapElementSchema);
export default MapElement;