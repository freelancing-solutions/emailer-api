const nodemailer = require('nodemailer');
const config = require("config");

/**
 * 
 * Used to send messages such as 
 * Login Codes, Email Verification Codes , Transaction Activation Codes, such as Withdrawals 
 **/

const send_noreply_messages = async email => {
    
    const results = {status : true, payload : {}, error :{}};
    try{

        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_SERVER || config.get('smtp_server'),
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: process.env.NOREPLY_USERNAME || config.get('noreply_username'), // generated ethereal user
              pass: process.env.NOREPLY_PASSWORD || config.get('noreply_password'), // generated ethereal password
            },
          });
          
          
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: process.env.NOREPLY_USERNAME || config.get('noreply_username'), // sender address
        to: email.to, // list of receivers
        subject: email.subject, // Subject line
        text: email.text, // plain text body
        html: email.html, // html body
      });

      results.status = true;
      results.payload = {...info};

    }catch(error){

      results.status = false;
      results.payload = {};
      results.error = {...error};
      
    }

    return results    
};


/***
 * Used to send notification Messages
 * ...Deposit Verified Message, Withdrawal Sent, Account Funded Message
 * 
 * 
 **/
const send_admin_messages = async email => {
  const results = {status : true, payload : {}, error :{}};

  return results
};



module.exports = {
  send_noreply: send_noreply_messages,
  send_admin : send_admin_messages  
};