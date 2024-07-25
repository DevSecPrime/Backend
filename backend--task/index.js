
//craete express app instance
const express = require("express");
const app = express();
require("dotenv").config();

///parse in json use middleware
app.use(express.json());


//creat port number
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`The server is started on on PORT NUMBER :- ${PORT}`)
})

//connect with database
const dbConnect = require("./config/database")
dbConnect();

//import cookie Parsrer for storing token in local storage
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//import routes
const userRouter = require("./routes/userRoutes");
app.use("/api/v1", userRouter)

const todoRouter = require("./routes/todoRoutes");
app.use("/api/v1", todoRouter)

//create default route
app.get("/", (req, res) => {
    res.send("<h1>This is our home page...</h1>")
})