//import commment & post models


const Comment = require("../models/comentModel");
const Post = require("../models/postModels")


exports.createComment = async (req, res) => {
    try {
        //fetch the data from the req body..
        const { post, user, body } = req.body;

        //created a new comment object
        const newComment = new Comment({
            post, user, body
        })

        //save the new comments in databse...
        const savedComment = await newComment.save()

        //find the post by ID , add the new comment in the its comments array
        const updatedPost = await Post.findByIdAndUpdate(post, { $push: { comments: savedComment._id } }, { new: true })
            .populate("comments") ///populate the comments array with comment document
            .exec()

        res.status(200).json({
            success: true,
            data: updatedPost,
            message: "New Comment created Successfully..."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error While creating comment..."
        })
    }
}