var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
const _ = require('lodash');
var {authenticate} = require('./middleware/authenticate');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();

app.use(bodyParser.json());

 
 app.get('/',(req,res)=>{
   res.send('Hello');
 })

 app.post('/todos',authenticate,(req,res)=>{
   var todo = new Todo({
     text:req.body.text,
     _creator:req.user._id
   });
   todo.save().then((doc)=>{
    res.send(doc);
   },(e)=>{
     res.status(400).send(e);
   });
 });
 
 app.patch('/todos/:id',(req,res)=>{
   var id =req.params.id;
   var body = _.pick(req.body,['text','completed']);

   if(!ObjectID.isValid(id)){
     return res.status(404).send();
   }
   if(_.isBoolean(body.completed) && body.completed){
     body.completedAt = new Date().getTime();
   }
   else{
     body.completed = false;
     body.completedAt = null;
   }

   Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send(todo);
   }).catch((e)=>{
     res.status(404).send();
   })
 });

 app.post('/users/login',(req,res) =>{
  var body = _.pick(req.body,['email','password']);
  console.log(body);
  User.findByCredentials(body.email,body.password).then((user)=>{
    res.send(user);
  }).catch((e)=>{
    res.status(400).send();
  });
 });
 app.delete('/users/me/token',authenticate,(req,res)=>{
  req.user.removeToken(req.token).then(()=>{
    res.status(200).send();
  },()=>{
    res.status(400).send();
  });
 });
 app.delete('/todos/:id',(req,res)=>{
   var id = req.params.id;
  // if(!ObjectID.isValid(id)){
  //   return res.status(404).send();
  // }
  // Todo.findById(id).then((todo)=>{
  //   if(!todo){
  //     return res.status(404).send();
  //   }
  //   res.send(todo);
  // }).catch((e) =>{
  //   res.status(400).send();
  // }

  // res.send(ObjectID.isValid(id));
  // });
  Todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send(todo);
  },(err)=>{
      return res.status(400).send();
  });
 });

 app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

 app.post('/users',(req,res) =>{
   var body = _.pick(req.body,['email','password']);
   var user = new User(body);
   user.save().then(()=>{
     return  user.generateAuthToken();
   }).then((token)=>{
      res.header('x-auth',token).send(user);
   }).catch((e)=>{
     res.status(400).send();
   })
 })
app.listen(3000,()=>{
  console.log('Starting on port 3000');
});