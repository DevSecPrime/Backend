const mongoose = require("mongoose");

require("dotenv").config()


const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("database is connectede successfull...")
    }).catch((error) => {
        console.log("Having issue in database connection...");
        console.error(error);
        process.exit(1)
    })
}

module.exports = dbConnect;