//create express instancxe...

const express = require("express");
const router = express.Router();

//import controller
const { createComment } = require("../controllers/commentsControllers");
const { createPost, getAllPost } = require("../controllers/postControlller")
const { likePost, dislikePost } = require("../controllers/likeController")

//API mapping
router.post("/comments/create", createComment);
router.post("/post/createPost", createPost);
router.get("/post/getAllPosts", getAllPost);
router.post("/likes/like", likePost);
router.delete("/likes/unlike", dislikePost)

//export 

module.exports = router;