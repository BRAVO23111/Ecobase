// models/EcoAction.js
import mongoose from "mongoose";

const EcoActionSchema = new mongoose.Schema({
    actionType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    time: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

export const EcoActionModel = mongoose.model("EcoAction", EcoActionSchema);
