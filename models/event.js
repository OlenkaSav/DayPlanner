import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
    {
        title: String,
        start: Number,
        duration: Number,
    },
    { timestamps: true, }

);

const Event = mongoose.model.Event || mongoose.model("Event", eventSchema);

export default Event;

// const mongoose = require('mongoose')
// const eventSchema = new mongoose.Schema({
//     title: { type: String },
//     start: { type: Number },
//     duration: {type: Number}
// })

// mongoose.models = {}
// module.exports = mongoose.model('Events', eventSchema);