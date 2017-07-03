const moment = require('moment');

// // var date = new Date().getTime()
// var date = new Date()
// console.log(date.getMonth())

// var date = moment();
// date.add(100, 'year').subtract(9, 'month')
// console.log(date.format('MMMM Do YYYY'));

var date = moment();
console.log(date.format('H:mm a'));

var date = moment().valueOf();
console.log(date);
