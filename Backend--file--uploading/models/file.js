const mongoose = require("mongoose");
const sendMail = require("../config/mailer");
require("dotenv").config();

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});


fileSchema.post("save", async function (doc) {
    try {
        //printing the dcoument
        console.log("DOCUMENT ---------------------------------------------->", doc);

        //call sendMail function here ------> async function sendMail(email,fileUrl)
        await sendMail(doc.email, doc.fileUrl);

       
    } catch (error) {
        console.error("Error :-", error)
    }
})
//Define Middleware Before Compiling Models

// module.exports = mongoose.model("File", fileSchema);   -----> old way
//new way to exporyt model 
const File = mongoose.model("File", fileSchema);
module.exports = File;