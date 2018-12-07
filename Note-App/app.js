console.log('Starting app.js');

const fss = require('fs');
const _ = require('lodash'); 
const yargs = require('yargs');
const argv = yargs.argv;
var command = process.argv[2];
console.log('command:',command);
console.log('yargs:',argv);
// console.log('Command: ',command);
// if(command === 'add'){
//     console.log('Adding new note');
// }
// else if (command === 'list'){
//     console.log('Listing all nodes');
// }
// else{
//     console.log('command not found');
// }