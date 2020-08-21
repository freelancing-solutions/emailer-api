// import moment from 'moment';

class Utilities {
  constructor(today) {
    this.today = today;    
    this.max_name_len = 36;
    this.max_input_len = 255;
    this.max_email_len = 255;
    this.max_body_len = this.max_input_len * 8;
  }

  isUrl = (url) => {
    let pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name and extension
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?" + // port
      "(\\/[-a-z\\d%@_.~+&:]*)*" + // path
      "(\\?[;&a-z\\d%@_.,~+&:=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator

    return pattern.test(url);
  };

  isEmpty = (a) => {
    return a !== undefined ? a === null || a === "" : true;
  };

  isProvince = (province) => {
    let province_list = [
      "limpopo",
      "mpumalanga",
      "north west",
      "gauteng",
      "kwazulu natal",
      "eastern cape",
      "western cape",
      "northern cape",
      "orange free state",
    ];
    for (let i = 0; i < province_list.length; i++) {
      if (province === province_list[i]) {
        return true;
      }
    }
    return false;
  };

  validateEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  validatePassword = (password) => {
    let re = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    return re.test(password);
  };

  validateUsername = (username) => {
    let re = /^\w+$/;
    return re.test(username);
  };

  isNumber = (n) => {
    return n !== undefined ? typeof n !== "boolean" && !isNaN(n) : false;
  };

  isCell = (n) => {
    return this.isNumber(n)
      ? n.length === 10 || n.length === 11 || n.length === 12 || n.length === 13
      : false;
  };

  isTel = (n) => {
    return n !== undefined ? this.isCell(n) : false;
  };

  isFax = (n) => {
    return n !== undefined ? this.isCell(n) : false;
  };

  getAge = (dateString) => {
    let dates = dateString.split("-");
    let d = new Date();

    let userday = dates[2];
    let usermonth = dates[1];
    let useryear = dates[0];

    let curday = d.getDate();
    let curmonth = d.getMonth() + 1;
    let curyear = d.getFullYear();

    let age = curyear - useryear;

    if (curmonth < usermonth || (curmonth === usermonth && curday < userday)) {
      age--;
    }
    return age;
  };
  isIDNumber = (n) => {
    return n !== undefined ? this.isNumber(n) && n.length === 13 : true;
  };

  countTimeBetweenTwoTimeStamps = (stamp_1, stamp_2) => {
    try {
      return stamp_1 - stamp_2;
    } catch (e) {
      return parseInt(stamp_1) - parseInt(stamp_2);
    }
  };

  throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function () {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function () {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  };


  returnMonthName = month => {
    const months_names = ['January','February','March','April','May','June','July','August','September','October', 'Novemeber','December'];
    return months_names[month-1]

  };

  debounce = (func, delay) => {
    let inDebounce;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
  };

  isLowercaseOnly = (text) => {
    const lowercaseOnly = /^[a-z]+$/g;
    return lowercaseOnly.test(text);
  };

  isAlpha = (text) => {
    const regexString = /^[a-z]+$/g;
    const inputString = String(text).toLowerCase();
    return regexString.test(inputString);
  };
  // test for text and punctuation and space bars
  isText = (text) => {
    const regexString = /^[a-zA-Z]+(([\'\,\.\- ][a-zA-Z ])?[a-zA-Z]*)*$/;
    const inputString = text.toString();
    return regexString.test(inputString);
  };

  parseInput = (data) => {
    // try removing trailing and leading spaces
    // return as integer if int and as lower case characters if string)
    try {
      const processed = String(data).trimLeft().trimRight();
      // trim characters if greater than 56
      if (processed.length > this.max_input_len) {
        processed = processed.splice(0, this.max_input_len);
      }
      return this.isNumber(processed)
        ? parseInt(processed)
        : processed.toLowerCase();
    } catch (error) {
      return "";
    }
  };

  parseBody = (body) => {
    try {
      const processed = String(body).trimLeft().trimRight();
      if (processed.length > this.max_body_len) {
        return processed.splice(0, this.max_body_len);
      }
      return processed;
    } catch (error) {
      return "";
    }
  };

  parseNames = (names) => {
    try {
      const processed = String(names).trimLeft().trimRight();
      if (processed.length > this.max_name_len) {
        processed = processed.splice(0, this.max_name_len);
      }
      return this.formatName(processed);
    } catch (error) {
      return "";
    }
  };

  parseEmail = (email) => {
    try {
      const processed = String(email).trimLeft().trimRight();
      if (processed.length > this.max_email_len) {
        processed = processed.splice(0, this.max_email_len);
      }
      if (this.validateEmail(processed)) {
        return processed;
      }
      return "";
    } catch (error) {
      return "";
    }
  };

  formatName = (name) => {
    const processed = String(name).toLowerCase();
    const wordlists = processed.split(" ");
    
    let sentence = ""
    wordlists.forEach(word => sentence += word.charAt(0).toUpperCase() + word.slice(1) + " ");
    return sentence.trimRight();
  };

  formatParagraph = paragraph => String(paragraph).trim().toLowerCase().charAt(0).toUpperCase() + paragraph.slice(1);
    

  

  toHttps = (url) => {
    if (url) {
      return url.replace(/^http:\/\//i, "https://");
    }
    return url;
  };

  formatMoney = (money) => {
    if (this.isNumber(money)) {
      return String(money).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return 0;
  };

  formatNumber = number => {
    if(this.isNumber(number)){
      return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return 0
  };

  formatCurrency = cur => String(cur).toUpperCase()

  // replacing script tags and returning the string
  replaceScriptTags = (html) =>html.toString().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gim, "");

  // replace link tags
  replaceLinkTags = text =>  text.toString().replace(/<a\b[^>]*>/i, "").replace(/<\/a>/i, "");
  // replace link tags and then replace script tags
  sanitizeHTML = html => this.replaceScriptTags(this.replaceLinkTags(html))
  
//   showRelativeTime = from_time => moment(from_time).fromNow()

  prepareSEODescription = (text) => {
    const prepared = this.parseInput(text);
    if (prepared.length > 155) {
      return prepared.slice(0, 155);
    }
    return prepared;
  };

  milliSecondsToDate = (milliseconds) =>' ' + (new Date(milliseconds)) + ' ';
  formatTimeStamp = timestamp => ' ' +  (new Date((timestamp * 1000) || this.today)) + ' ';

  // displayTime = compose(toLowerCase,split('/'),['GMT']);



  // handle axios errors
  // TODO- function needs to be highly improved
  //TODO-- it has to take care of all the errors thrown by Google App Engine


  handleAxiosErrors = (error, results) => {

     const error_strings = {
      internal_server_error : 'internal server error',
      connection_error : '(econnrefused)',
      out_of_quota : 'datastore_v3.runquery()'
    };

    const error_messages = {
      high_traffic_volume : 'Due to high traffic volume we are unable to process your request, please try again later',
      connection_error : 'Connection Error there might be a problem with your internet connection',
      internal_server_error : 'fatal error occured please try again later if the problem persists inform the adminstrator'
    };
    
 

    results.status = false;
    
    if (error.response) {
        
        if(String(error.response.data).toLowerCase().includes(error_strings.out_of_quota)){
            results.error = {message: error_messages.high_traffic_volume }
        }else if(String(error.response.data).toLowerCase().includes(error_strings.internal_server_error)){
            results.error = {message: error_messages.internal_server_error}          
        }else{
            results.error = { message: error.response.data };
        }

    } else if (error.request) {
        
        if (String(error.request.data).toLowerCase().includes(error_strings.connection_error)){
          results.error = {message: error_messages.connection_error}
        }else{
            results.error = {message: error.message}
        }

    } else {
          results.error = { message: error.message };
    }

    return results;
  };




 isLocalhost = () => {
    return 
    window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )

 };

 getRandomLower = () => String.fromCharCode(Math.floor(Math.random() * 26) + 97);
 getRandomHigher = () => String.fromCharCode(Math.floor(Math.random() * 26) + 65);

 returnRandomString = len => {
   let string = ''
   for (let i = 0; i < len; i++){
      string += this.getRandomLower() || this.getRandomHigher()
   }
   return string;
 }


isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

/***
 * check if there is an internet connection
 */
isInternet = () => {return true}

}



module.exports = {
    utitilies : new Utilities(Date.now())
};
