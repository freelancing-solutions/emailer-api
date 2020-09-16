const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const cors = require("cors");
const {utilities} = require('./utilities');
const mongoose = require('mongoose');
const { util } = require("config");
const PORT = process.env.PORT || 7001;
const validator = require('email-validator');

// mongoose.connect(process.env.MONGODB_URI || config.get("mongoDB"), {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// db.on("connected", () => console.log("mongo db connected"));
// db.on("disconnected", () => console.log("mongo db disconnected"));
// db.on("error", () => console.log("Error connecting with mongo db"));

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse json requests
app.use(bodyParser.json({extended: true}));


// adding cors
app.use(cors());


/*** set response headers to json this insures that the calling app can accept json strings **/
const set_response_headers = (req, res, next) => {
    // res.setHeader({'Content-Type': 'application/json'});
    next();
};

/*******
 * API Key Based Authorization
 *******/
const authorize =  (req,res,next) => {
    const results = {status: false, payload : {}, error:{message: 'error user not authorized'}}
    try{
        const internal_key = process.env.INTERNAL_KEY || config.get('INTERNAL_KEY');
        const route  = req.originalUrl;
        const routes = route.split('/');
        const key = String(routes[routes.length - 1]).trim();
        
    
        if (internal_key === key){
            res.locals.authorized = true;          
        }else{        
            res.locals.authorized = false;
            return res.status(401).json(results);            
        }

    }catch(error){
        res.locals.authorized = false;
        results.status = false;
        results.error = {message: 'general error : {}'.format(error)}
        return res.status(200).json(results);
    }

    next()
};

/*****
 * Data Verification
 */
const verify_message = (req, res, next) => {
    const results = {status : false, payload: {}, error: {}};
    let email = { subject: '',text : '',html: '',to : ''};

    if (res.locals.authorized){              
      email ={ ... req.body};    
      console.log('email ', email);
      if (validator.validate(email.to) === false){
        results.status = false;
        results.error = {message: 'error: email is invalid'};
        return res.status(401).json(results);
      }

      if (utilities.isEmpty(email.subject)){
        results.status = false;
        results.error = {message: 'error: subject cannot be empty'};
        return res.status(401).json(results);
      }

      if (utilities.isEmpty(email.text)){
        results.status = false;
        results.error = {message : 'error: text field cannot be empty'};
        return res.status(401).json(results);
      }

      if (utilities.isEmpty(email.html)){
        results.status = false;
        results.error = {message : 'error: html field cannot be empty'};
        return res.status(401).json(results);
      }
  }else{
    results.status = {message : 'user not authorized'};
    return res.status(401).json(results);
  }

    res.locals.email = {...email};
    next()
};

app.get('/', (req,res) => {
    res.status(200).send({message: 'hello world'});
});

/****
 * 
 * Personal Middle Ware
 */

// app.use(set_response_headers);
app.use(authorize);
app.use(verify_message);
app.use('/api/v1/', require('./routes/version1'));

// listening for requests
app.listen(PORT).on('listening', () => {
    console.log(`Bulk Emailer API Running on  ${PORT} `);    
});