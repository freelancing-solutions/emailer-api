const express = require('express');
const router = express.Router();
const version1_api_calls = require('./mailer');




/***************************************************************************************
 * Send No Reply Related Messages
 *
 */
router.post('/send-noreply/:key', (req,res) => {
  // format of my api
  const results = {status : false, payload: {}, error: {}};
  console.log('Check Email ',res.locals.email);
  version1_api_calls.send_noreply(res.locals.email).then(response => {
    // returning the response
    res.status(200).json(response);
  }).catch(error => {
    results.status = false;
    results.error = {message: `error: ${error.message}`};
    res.status(401).json(results);
  });

});

/*************************************************************************************
 *
 * Send Support Related Email Messages
 */
router.post('/send-support/:key', (req,res) => {

  // format of my api
  const results = {status : false, payload: {}, error: {}};

  console.log('Check Email ',res.locals.email);
  version1_api_calls.send_support(res.locals.email).then(response => {
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
router.post('/send-admin/:key', (req,res) => {
  // res.setHeader('Content-Type','application/json');
  // format of my api
  const results = {status : false, payload: {}, error: {}};
  console.log('Check Email ',res.locals.email);

  // called the send_admin API
  version1_api_calls.send_admin(res.locals.email).then(response => {
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
router.post('/send-affiliates/:key', (req,res) => {
  // res.setHeader('Content-Type','application/json');
  // format of my api
  const results = {status : false, payload: {}, error: {}};
  console.log('Check Email ',res.locals.email);

  // called the send_admin API
  version1_api_calls.send_affiliates(res.locals.email).then(response => {
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

router.post('/send-info/:key', (req,res) => {
  // res.setHeader('Content-Type','application/json');
  // format of my api
  const results = {status : false, payload: {}, error: {}};
  console.log('Check Email ',res.locals.email);
  // called the send_admin API
  version1_api_calls.send_info(res.locals.email).then(response => {
      res.status(200).json(response);
    }).catch(error => {
      results.status = false;
      results.error = {message: `error: ${error.message}`};
      res.status(401).json(results);
  });

})

module.exports = router;