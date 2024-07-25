const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config()

//sign up

exports.createUser = async (req, res) => {
    try {
        //fetch data from req.body
        const { name, email, password } = req.body;

        //validation
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists..."
            })
        }
        //hash password
        let hashPassword;

        try {
            hashPassword = await bcrypt.hash(password, 10)
        } catch (error) {
            res.status(401).json({
                success: false,
                message: "error in hashing password..."
            })
        }
        //create database
        const newUser = await User.create({
            name,
            email,
            password: hashPassword
        })
        //response
        return res.status(200).json({
            success: true,
            message: "New User created successfull",
            data: newUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message || "Error in creating new user..."
        })
    }
}

//login
exports.logIn = async (req, res) => {
    try {
        //fetch data from req.user
        const { email, password } = req.body;

        //validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All field are required.."
            })
        }

        //check if user doesnot exist
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found..."
            })
        }

        const payload = {
            id: user._id,
            email: user.email
        }
        //comapre password
        if (await bcrypt.compare(password, user.password)) {
            //if pwd matched genrate token
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

            console.log("TOKEN------->", token);

            user.token = token;
            await user.save();

            user.password = undefined;


            const options = {
                httpOnly: true,

            }
            //send response
            return res.status(200).cookie("token", token, options).json({
                success: true,
                message: "User Logged in...",
                token,
                data: user
            })
        }
        else {
            return res.status(402).json({
                success: false,
                message: "Password do not matched..."
            })
        }


    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message || "Error in Log in..."
        })
    }
}

///get uer profile
exports.getProfile = async (req, res) => {
    try {
        //fetch token from req.user
        const userId = req.user.id;

        //find user
        const user = await User.findById(userId);

        //cehck if user  exist or not
        if (!user || user === undefined) {
            return res.status(400).json({
                success: false,
                message: "User not found..."
            })
        }
        user.password = undefined;
        ///response
        return res.status(200).json({
            success: true,
            message: "Profile fetched successfully...",
            data: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message || "Error in getting profile..."
        })
    }
}