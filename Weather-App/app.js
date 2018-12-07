const yargs = require('yargs');
const axios = require('axios');
// const argv = yargs.options({
//   a:{
//     demand:true,
//     alias:'address',
//     describe:'Address fetch',
//     string:true
//   }})
//   .help()
//   .alias('help','h')
//   .argv;
// var encodedAddress = encodeURIComponent(argv.address);
// request({
//   url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
//   json:true
// },(error,response,body)=>{
//   console.log(JSON.stringify(error,undefined,2));
//   // console.log(response.statusCode);
// })
// request({
//   url:`https://api.darksky.net/forecast/eeafc93eeef41c0aab599723e27956e6/18.5204,73.8567`,
//   json:true
// },(error,response,body) =>{
//   console.log(body.currently.temperature);
// })
const argv = yargs.options({
  la:{
    demand:true,
    alias:'latitude',
    string:true
  },
  lo:{
    demand:true,
    alias:'longitude',
    string:true
  }
})
.help()
.alias('help','h')
.argv;

const a = argv.la;
const b= argv.lo;
var url = `https://api.darksky.net/forecast/eeafc93eeef41c0aab599723e27956e6/${a},${b}`;

axios.get(url).then((response)=>{
  console.log(response.data.currently.temperature);
}).catch((e)=>{
  console.log(e);
});
