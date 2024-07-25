const Post = require("../models/postModels")


exports.createPost = async (req, res) => {
    try {
        const { title, body } = req.body;
        const post = new Post({
            title, body
        });
        const savedPost = await post.save();

        res.status(200).json({
            success: true,
            data: savedPost,
            message: "post created successfully.."
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message,
            message: "Having error in creating the post..."
        })
    }
}


exports.getAllPost = async (req, res) => {
    try {
        const posts = await Post.find().populate("comments").populate("likes").exec()

        if (!posts) {
            return res.status(404).json({
                success: false,
                error: "Post not found..."
            })
        }

        res.status(200).json({
            success: true,
            data: posts,
            message: "All post aare fetched sucessfully..."
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message,
            message: "Having error in getting the post..."
        })
    }
}