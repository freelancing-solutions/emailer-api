const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const cors = require("cors");
const {send_noreply,send_admin} = require('./mailer');
const {utilities} = require('./utilities');
const mongoose = require('mongoose');
const { util } = require("config");
const PORT = process.env.PORT || 7001;


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


app.get('/', (req,res) => {
    res.status(200).json({message :'hello world'});
});


app.post('/api/v1/send-noreply', (req,res) => {

  // format of my api
  const results = {status : false, payload: {}, error: {}};
  /**
   * format of email 
   * to
   * subject
   * text
   * html 
   * 
   */
  

  let email = {
    subject: '',
    text : '',
    html: '',
    to : ''
  }
  
  try{

    console.log('PARAMS :',req.body);
    const{subject,text,html,to} = (req.body);
    email ={
      subject:subject,text:text,html:html,to:to
    }
  }catch(error){
    console.log('error', error);
  }
  console.log('Email : ',email);

  if (utilities.validateEmail(email.to) === false){
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

  /***
   * all is well call the API
   */

  send_noreply(email).then(response => {
    // returning the response
    res.status(200).json(response);  
  }).catch(error => {
    results.status = false;
    results.error = {message: `error: ${error.message}`};
    res.status(401).json(results);
  });

});

app.post('/api/v1/send-support', (req,res) => {

  // format of my api
  const results = {status : false, payload: {}, error: {}};
  /**
   * format of email 
   * to
   * subject
   * text
   * html 
   * 
   */
  

  let email = {
    subject: '',
    text : '',
    html: '',
    to : ''
  }
  
  try{

    console.log('PARAMS :',req.body);
    const{subject,text,html,to} = (req.body);
    email ={
      subject:subject,text:text,html:html,to:to
    }
  }catch(error){
    console.log('error', error);
  }
  console.log('Email : ',email);

  if (utilities.validateEmail(email.to) === false){
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

  /***
   * all is well call the API
   */

  send_support(email).then(response => {
    // returning the response
    res.status(200).json(response);  
  }).catch(error => {
    results.status = false;
    results.error = {message: `error: ${error.message}`};
    res.status(401).json(results);
  });

});

app.post('/api/v1/send-admin', (req,res) => {
  

  // res.setHeader('Content-Type','application/json');
  // format of my api
  const results = {status : false, payload: {}, error: {}};
  /**
   * format of email 
   * to
   * subject
   * text
   * html 
   * 
   */
  console.log('PARAMS : ',req.params);
   const {email} = req.params;

  if (utilities.validateEmail(email.to) === false){
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

  // called the send_admin API
  send_admin(email).then(response => {
      res.status(200).json(response);
    }).catch(error => {
      results.status = false;
      results.error = {message: `error: ${error.message}`};
      res.status(401).json(results);
  });
  
})


// listening for requests
app.listen(PORT).on('listening', () => {
    console.log(`Bulk Emailer API Running on  ${PORT} `);    
});