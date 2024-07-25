// import modfels of post and Likes

const Like = require("../models/likeModel");
const Post = require("../models/postModels");

//like a post
exports.likePost = async (req, res) => {
    try {
        const { user, post } = req.body;

        const like = new Like({
            user, post
        });

        const savedLike = await like.save();

        //update post collection on the bases of like
        const updatePost = await Post.findByIdAndUpdate(post, { $push: { likes: savedLike._id } }, { new: true })
            .populate("likes").exec()

        res.status(200).json({
            success: true,
            data: updatePost,
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
            message: "Error while liking post..."
        })
    }
}

//unlike the post  

exports.dislikePost = async (req, res) => {
    try {
        const { post, like } = req.body;

        //find the is form the like collection match it with post and like ids -------> input
        const deletedLike = await Like.findOneAndDelete({ post: post, _id: like });

        //update the post collection ---> delete like form post collection
        const updatedPost = await Post.findByIdAndUpdate(post, { $pull: { likes: deletedLike._id } }, { new: true });

        res.status(200).json({
            success: true,
            post: updatedPost,
            message: "Like deleted successfullly..."
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
            message: "Error while disliking post..."
        })
    }
}