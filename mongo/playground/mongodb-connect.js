const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
  if(err){
    return console.log('Unable to connect to database');
  }
  console.log('Connected to MongoDB');
  const db = client.db('TodoApp');
  db.collection('Users').insertOne({
    name:'Rajat',
    age:21,
    location:'Pune'
  },(err,result) =>{
    if(err){
      return console.log('error in inserting todo',err);
    }
    console.log(JSON.stringify(result.ops,undefined,2));
  });
  client.close();
});
