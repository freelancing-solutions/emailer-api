const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const cors = require("cors");
const {send_noreply,send_admin,send_support,send_affiliates,send_info} = require('./mailer');
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

let authorized = false;

const authorize =  (req,res,next) => {           
    try{
        const results = {status: false, payload : {}, error:{message: 'error user not authorized'}}
        const internal_key = process.env.INTERNAL_KEY || config.get('INTERNAL_KEY');
        const route  = req.originalUrl;
        const routes = route.split('/');
        const key = String(routes[routes.length - 1]).trim();
    
        if (internal_key === key){
            authorized = true;
            res.status(401).json(results);
        }else{        
            authorized = false;
            res.status(401).json(results);
            
        }
    }catch(error){
        next(error);
    }
    next()
};




const verify_message = (req, res, next) => {
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
  
  next(email)
}

app.get('/', (req,res) => {
    res.status(200).send({message: 'hello world'});
});

app.use(authorize);
app.use(verify_message);

/***************************************************************************************
 * Send No Reply Related Messages
 * 
 */
app.post('/api/v1/send-noreply/:key', (req,res,email) => {

  console.log('check the results : ', email);
  // format of my api
  const results = {status : false, payload: {}, error: {}};
  /**
   * format of email 
   * to
   * subject
   * text
   * html 
   * 
   **/
  

  // let email = {
  //   subject: '',
  //   text : '',
  //   html: '',
  //   to : ''
  // }
  
  // try{

  //   console.log('PARAMS :',req.body);
  //   const{subject,text,html,to} = (req.body);
  //   email ={
  //     subject:subject,text:text,html:html,to:to
  //   }
  // }catch(error){
  //   console.log('error', error);
  // }
  // console.log('Email : ',email);

  // if (utilities.validateEmail(email.to) === false){
  //   results.status = false;
  //   results.error = {message: 'error: email is invalid'};
  //   return res.status(401).json(results);
  // }

  // if (utilities.isEmpty(email.subject)){
  //   results.status = false;
  //   results.error = {message: 'error: subject cannot be empty'};
  //   return res.status(401).json(results);
  // }

  // if (utilities.isEmpty(email.text)){
  //   results.status = false;
  //   results.error = {message : 'error: text field cannot be empty'};
  //   return res.status(401).json(results);
  // }

  // if (utilities.isEmpty(email.html)){
  //   results.status = false;
  //   results.error = {message : 'error: html field cannot be empty'};
  //   return res.status(401).json(results);
  // }

  /***
   * all is well call the API
   ***/

  // send_noreply(email).then(response => {
  //   // returning the response
  //   res.status(200).json(response);  
  // }).catch(error => {
  //   results.status = false;
  //   results.error = {message: `error: ${error.message}`};
  //   res.status(401).json(results);
  // });

});



/*************************************************************************************
 * 
 * Send Support Related Email Messages
 */
app.post('/api/v1/send-support/:key', (req,res) => {

  // format of my api
  const results = {status : false, payload: {}, error: {}};
  /**
   * format of email 
   * to
   * subject
   * text
   * html 
   * 
   **/
  let email = {
    subject: '',
    text : '',
    html: '',
    to : ''
  }
  
  try{    
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
   ***/

  send_support(email).then(response => {
    // returning the response
    res.status(200).json(response);  
  }).catch(error => {
    results.status = false;
    results.error = {message: `error: ${error.message}`};
    res.status(401).json(results);
  });

});



/****************************************************************************************
 * 
 * 
 * Send Admin Related Email Messages
 */

app.post('/api/v1/send-admin/:key', (req,res) => {
  

  // res.setHeader('Content-Type','application/json');
  // format of my api
  const results = {status : false, payload: {}, error: {}};
  /***
   * format of email 
   * to
   * subject
   * text
   * html 
   * 
   ***/
  /**
   * format of email 
   * to
   * subject
   * text
   * html 
   * 
   **/
  let email = {
    subject: '',
    text : '',
    html: '',
    to : ''
  }
  
  try{    
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



  // called the send_admin API
  send_admin(email).then(response => {
      res.status(200).json(response);
    }).catch(error => {
      results.status = false;
      results.error = {message: `error: ${error.message}`};
      res.status(401).json(results);
  });
  
})


/********************************************************************************
 * 
 * Send Affiliates related emails
 */

app.post('/api/v1/send-affiliates/:key', (req,res) => {
  // res.setHeader('Content-Type','application/json');
  // format of my api
  const results = {status : false, payload: {}, error: {}};
  /***
   * format of email 
   * to
   * subject
   * text
   * html 
   * 
   **/
  let email = {
    subject: '',
    text : '',
    html: '',
    to : ''
  }
  
  try{    
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



  // called the send_admin API
  send_affiliates(email).then(response => {
      res.status(200).json(response);
    }).catch(error => {
      results.status = false;
      results.error = {message: `error: ${error.message}`};
      res.status(401).json(results);
  });
  
})

/*************************************************************************
 * Send Info
 * 
 */

app.post('/api/v1/send-info/:key', (req,res) => {
  // res.setHeader('Content-Type','application/json');
  // format of my api
  const results = {status : false, payload: {}, error: {}};
  /***
   * format of email 
   * to
   * subject
   * text
   * html 
   * 
   **/
  let email = {
    subject: '',
    text : '',
    html: '',
    to : ''
  }
  
  try{    
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



  // called the send_admin API
  send_info(email).then(response => {
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