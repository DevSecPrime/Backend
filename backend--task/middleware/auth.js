const jwt = require("jsonwebtoken");
require("dotenv").config();

//verification of token
exports.auth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token is missing...."
            })
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log("Decode Token ---------->", decode);
            req.user = decode;
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Token is invalid...."
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message || error,
            message: "Error in verifying token..."
        })
    }
}