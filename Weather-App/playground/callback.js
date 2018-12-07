var getuser = (id,callback) =>{
  var user = {
    id:id,
    name:'Rajat'
  };
  callback(user);
};
getuser(123,(user)=>{
  console.log(user);
});
