const mongoose = require("mongoose");
const Schema = mongoose.Schema
const quizSchema = new Schema({
    _id: {
        type: Schema.ObjectId
    },
    email: {
        type: String,
        required: true,
    },
    quiz: {
        type: Array
    }
});

module.exports = new mongoose.model("quizData", quizSchema);