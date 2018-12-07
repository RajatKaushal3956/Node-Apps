const express = require('express');

var app = express();

app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
app.get('/',(req,res)=>{
  res.send('hello express');
});

app.use((req,res,next)=>{
  var now = new Date().toString();
  console.log(`${now}`);
  next();
})
app.get('/home',(req,res)=>{
  res.render('home.hbs',{
    pageTitle:'Home Page',
    currentYear:new Date().getFullYear()
  });
});
app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle:'About Page',
    currentYear: new Date().getFullYear()
  });

})
app.listen(3000,() =>{
  console.log('Server is up on port 3000');
});
