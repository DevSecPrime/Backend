const mongooose = require("mongoose");
require("dotenv").config()

const dbConnect = () => {
    mongooose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Database connection is established successfully...");
    }).catch(() => {
        console.log("Issue in database connection...");
        console.error(error);
        process.exit(1);//fetal error -- exits with error
    })
}

module.exports = dbConnect;