//import mongooose

const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post", //Reference to post model
    },

    user: {
        type: String,
        required: true
    }
});

//export...
module.exports = mongoose.model("Like", likeSchema);