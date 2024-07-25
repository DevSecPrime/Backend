//import mongoose...
const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    body: {
        type: String,
        require: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",//Taken reference to Like model
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",//Taken Reference to Comment Model
    }]
})


module.exports = mongoose.model("Post", postSchema);