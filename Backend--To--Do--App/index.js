//initiate the server..
const express = require("express");
const app = express() //created server instance

require("dotenv").config();

const PORT = process.env.PORT || 4000;

//user middleware to parse the json req.body
app.use(express.json())


//import routes
const todoRoutes = require("../Backend--To--Do--App/routes/todoRoutes");
//mount the todo routes...apppend all routes
app.use("/api/v1", todoRoutes);

//start server..
app.listen(PORT, () => {
    console.log(`Your server is running on port number ${PORT}`)
})

//connect the database 
const dbConnect = require("../Backend--To--Do--App/config/database")
dbConnect();


//create default routes...
app.get("/", (req, res) => {
    res.send("<h1>This is HOMEPAGE...</h1>")
})