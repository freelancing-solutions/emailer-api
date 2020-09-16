const nodemailer = require('nodemailer');
const config = require("config");

/**
 *
 * Used to send messages such as
 * Login Codes, Email Verification Codes , Transaction Activation Codes, such as Withdrawals
 **/

const do_send_mail = async (user,pass,email) => {
    const results = {status : false, payload : {}, error :{}};
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_SERVER || config.get('smtp_server'),
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: user,
              pass: pass
            },
          });
        let info =  await transporter.sendMail(email);
      results.status = true;
      results.payload = {...info};
      return results;
}

const send_noreply_messages = async email => {

    const results = {status : false, payload : {}, error :{}};
    try{
        email.from = process.env.NOREPLY_USERNAME || config.get('noreply_username');
        const user = process.env.NOREPLY_USERNAME || config.get('noreply_username');
        const pass = process.env.NOREPLY_PASSWORD || config.get('noreply_password');
        return await  do_send_mail(user,pass,email);
    }catch(error){
      results.error = {...error};
    }

    return results
};


const send_support = async email => {
    const results = {status : false, payload : {}, error :{}};
    try{
        email.from = process.env.SUPPORT_USERNAME || config.get('support_username');
        const user = process.env.SUPPORT_USERNAME || config.get('support_username');
        const pass = process.env.SUPPORT_PASSWORD || config.get('support_password');
        return await  do_send_mail(user,pass,email);
    }catch(error){
      results.error = {...error};
    }

    return results
};

/***
 * Used to send notification Messages
 * ...Deposit Verified Message, Withdrawal Sent, Account Funded Message
 *
 *
 ***/
const send_admin_messages = async email => {
   const results = {status : false, payload : {}, error :{}};
    try{
        email.from = process.env.ADMIN_USERNAME || config.get('admin_username');
        const user = process.env.ADMIN_USERNAME || config.get('admin_username');
        const pass = process.env.ADMIN_PASSWORD || config.get('admin_password');
        return await  do_send_mail(user,pass,email);
    }catch(error){
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
const send_affiliates_messages = async email => {
   const results = {status : false, payload : {}, error :{}};
    try{
        email.from = process.env.AFFILIATES_USERNAME || config.get('affiliates_username');
        const user = process.env.AFFILIATES_USERNAME || config.get('affiliates_username');
        const pass = process.env.AFFILIATES_PASSWORD || config.get('affiliates_password');
        return await  do_send_mail(user,pass,email);
    }catch(error){
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
const send_info = async email => {
   const results = {status : false, payload : {}, error :{}};
    try{
        email.from = process.env.INFO_USERNAME || config.get('info_username');
        const user = process.env.INFO_USERNAME || config.get('info_username');
        const pass = process.env.INFO_PASSWORD || config.get('info_password');
        return await  do_send_mail(user,pass,email);
    }catch(error){
      results.error = {...error};
    }

    return results
};

module.exports = {
  send_noreply: send_noreply_messages,
  send_admin : send_admin_messages,
  send_support : send_support,
  send_affiliates : send_affiliates_messages,
  send_info : send_info
};