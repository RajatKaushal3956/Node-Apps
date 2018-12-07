const request = require('request');
var geocodeLocation = (a,b,callback) =>{
  request({
    url:`https://api.darksky.net/forecast/eeafc93eeef41c0aab599723e27956e6/${a},${b}`,
    json:true
  },(error,response,body) =>{
    callback(error,body);
  })
}
module.exports.geocodeLocation = geocodeLocation;
