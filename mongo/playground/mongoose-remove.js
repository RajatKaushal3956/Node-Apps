const {ObjectID} = require('mongodb');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user');

Todo.findOneAndRemove({name:'Rajat'}).then((docs)=>{
    console.log(JSON.stringify(docs,undefined,2));
},(err)=>{
    console.log('Error: ',err);
});