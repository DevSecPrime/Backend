const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (email, fileUrl) => {
    try {
        //creat transpoter to send mail
        const transpoter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        //send mail
        const info = await transpoter.sendMail({
            from: `Mr. Prime`,
            to: email,
            subject: "New file uploaded to cloudinary",
            html: `<h1>File Upload</h1><p>View uploaded file here: <a href = "${fileUrl}">${fileUrl}</a></p>`
        });

        console.log("Mail sent------------------------------------------------------------>", info);


    } catch (error) {
        console.log(error);
    }
}

module.exports = sendMail;