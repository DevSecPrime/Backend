//express instance

const express = require("express");
const router = express.Router();


//import router handlers from the controllers...
const { localFileUpload, imageUpload, videoUpload, reducedImageUpload } = require("../controllers/fileUpload")

//define API route
router.post("/uploadLocalFile", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/uploadReducedSizeImage", reducedImageUpload);

//export router
module.exports = router;