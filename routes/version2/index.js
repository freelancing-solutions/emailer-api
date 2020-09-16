const express = require('express');
const router = express.Router();
const api_calls = require('./emailer');

router.post([
    '/send-noreply/:key',
    '/send-support/:key',
    '/send-admin/:key',
    '/send-affiliates/:key',
    '/send-info/:key'
], (req, res) => {

  const api_call = res.locals.api_call;
  switch (api_call) {
    case 'send-noreply' :
      api_calls.send_noreply(res.locals.email).then(response => res.status(200).json(response));
      break;
    case 'send-support':
      api_calls.send_support(res.locals.email).then(response => res.status(200).json(response))
      break;
    case 'send-admin':
      api_calls.send_admin(res.locals.email).then(response => res.status(200).json(response));
      break;
    case 'send-affiliates':
      api_calls.send_affiliates(res.locals.email).then(response => res.status(200).json(response));
      break;
    case 'send-info':
      api_calls.send_info(res.locals.email).then(response => res.status(200).json(response));
      break;
    case 'bulk-email':
      break;
    default :
      console.log('nothing to do');
      break;

  }

});

module.exports = router;