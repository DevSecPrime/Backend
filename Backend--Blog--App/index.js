const express = require("express");
const app = express();



require("dotenv").config()
const PORT = process.env.PORT || 4000;


//middleware 
app.use(express.json());


//connect with route...
const blogRouter = require("./routes/blogRoutes");
//mount routes...
app.use("/api/v1", blogRouter);


//connect with data base..
const dbConnect = require("../Backend--Blog--App/config/database")
dbConnect();


//start server
app.listen(PORT, () => {
    console.log(`Your server is running on port number ${PORT}`)
});

//default route...
app.get("/", (req, res) => {
    res.send("<h1> Hello ji.. kaise ho sab... kyaa haal chal sabke MITRO...ye hai apna HOME PAGE </h1>");
})