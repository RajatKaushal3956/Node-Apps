const users = [{
    id:1,
    name:'Andrew',
    schoolId:101
},
{
    id:2,
    name:'Jessica',
    schoolId:999
},
];
const grades = [];

const getUser = (id)=>{
    return new Promise((resolve,reject)=>{
        const user = users.filter((user) => user.id === id);
        if(user){
            resolve(user);
        }
        else{
            reject('Unable to find the user of id ',id);
        }
    });
};

getUser(2).then((user)=>{
    console.log(user);
}).catch((e)=>{
    console.log(e);
});

