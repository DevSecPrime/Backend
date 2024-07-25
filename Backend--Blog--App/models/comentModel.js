//import mongoose....

const mongoose = require("mongoose");

const comentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post", //reference to Post model
    },

    user: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Comment", comentSchema);