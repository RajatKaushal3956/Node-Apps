var express = require('express');
var app = express();

var {MongoClient} = require('mongodb');
var db;

// Initialize connection once
MongoClient.connect("mongodb://localhost:27017/TodoApp", function(err, database) {
  if(err) return console.error(err);

  db = database;

  // the Mongo driver recommends starting the server here because most apps *should* fail to start if they have no DB.  If yours is the exception, move the server startup elsewhere. 
});

// Reuse database object in request handlers
app.get("/", function(req, res,) {
  let data = db.collection('todos').find().toArray();
  res.status.send(data);
});

app.use(function(err, req, res){
   // handle error here.  For example, logging and returning a friendly error page
});

// Starting the app here will work, but some users will get errors if the db connection process is slow.  
  app.listen(3000);
  console.log("Listening on port 3000");