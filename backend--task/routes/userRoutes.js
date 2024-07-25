const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth")

//import router handlers
const { createUser, logIn, getProfile } = require("../controllers/auth")

//define API routes
router.post("/createUser", createUser);
router.post("/login", logIn);
router.get("/getProfile", auth, getProfile);

//excport router
module.exports = router;