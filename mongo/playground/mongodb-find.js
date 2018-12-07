const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
  if(err){
    return console.log('Unable to connect to database');
  }
  console.log('Connected to MongoDB');
  const db = client.db('TodoApp');
  db.collection('Users').find().toArray().then((docs)=>{
    console.log(JSON.stringify(docs,undefined,2));
  });
  client.close();
});
