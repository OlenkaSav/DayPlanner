import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
    {
        title: String,
        start: Number,
        duration: Number,
        user: String,
    },
    { timestamps: true, }

);

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;