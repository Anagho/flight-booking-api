// exports.exampleModel = [];
const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema(
    {
        id: { type: Number, unique: true},
        title: { type: String, required: true },
        time: { type: String, required: true },
        price: { type: Number, required: true },
        date: { type: String, required: true }
    }
);

module.exports = mongoose.model("Flight", FlightSchema);