//step 1: create a folder
//step 2: move into that folde via terminal
//step 3: run command $npm init -y --> for downloading the package.json file
//step 4: open that folder in vs code
//step 5: tun comand $npm install express --> which will install node modules
//step 6: create server.js file 
//step 7: install mongoose library for conecting database with node js $npm i mongooose

//create your own server....

//Server Inititated...
const express = require("express");

//bound express in app
const app = express();



///here body parser is required to parse the body data via request
//used to parse req.body in expresss ---> PUT or POST
const bodyParser = require("body-parser");

//specifically parse JSON data & add it to request.body object...
app.use(bodyParser.json());

//activated server on port 3000 ----> always define port to live the server 
app.listen(3000, () => {
    console.log("hello ji kaise ho sab ky hall chal sab k mitro.....");
    console.log("hamara server ..... 3000 pe chal raha hai., MITRO....");
    console.log("server is started....on post 3000")
})


//now let get the response on browser...

// get :- method is used for receive the data  ----> fetching the data
app.get("/", (req, res) => {
    res.send("Hello ji, kaise ho sab kyaa hal chal sabke....ham aye hai browser pr MITRO...")
})


//POST: to submit/ send the data // request the data ----> add the data in body in request

app.post("/api/cars", (req, res) => {
    const { name, brand } = req.body;
    console.log("Name is:-", name);
    console.log("Brand is:-", brand);
    res.send("cars are submitted successfully...");
})


const mongooose = require("mongoose")

//conncet mongo db with node via url ---> u can create new or existting db
mongooose.connect("mongodb://localhost:27017/myCars", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => { console.log("Database connected successfully....") })
    .catch(() => { console.log("Rejected....") })



// useNewUrlParse: true, -----> new url for use
// useUnifiedTopology: true ----> topoLogu for use