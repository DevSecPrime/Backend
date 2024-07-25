//create express instance
const express = require("express");
const app = express();

//useed miidleware for parse json 
app.use(express.json());

//used this middleware for upload the file --> can also use multer
const fileUpload = require("express-fileupload");
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
})); 

require("dotenv").config()
//define port 
const PORT = process.env.PORT || 3000;

//connect with database..
const dbConnect = require("./config/database");
dbConnect();

//connect with cloudnary
const cloudinary = require("./config/uploadToCloudinary");
cloudinary.cloudinaryConnect();

//mount routes..\
const Upload = require("./routes/fileUploadRoutes");
app.use("/api/v1/upload", Upload)

//initiate port
app.listen(PORT, () => {
    console.log(`Your server is running on port:- ${PORT}`);
});


//default route
app.get("/", (req, res) => {
    res.send("<h1>This is our home page...</h1>")
})