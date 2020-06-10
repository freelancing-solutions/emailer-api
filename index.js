const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const cors = require("cors");
const mongoose = require('mongoose');
const PORT = process.env.PORT || 7001;

mongoose.connect(process.env.MONGODB_URI || config.get("mongoDB"), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => console.log("mongo db connected"));
db.on("disconnected", () => console.log("mongo db disconnected"));
db.on("error", () => console.log("Error connecting with mongo db"));

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests
app.use(bodyParser.json());

// adding cors
app.use(cors());


app.get('/', (req,res) => {
    res.status(200).json({message :'hello world'});
});


// listening for requests
app.listen(PORT).on('listening', () => {
    console.log(`Bulk Emailer API Running on  ${PORT} `);    
});

