
const React   = require('react'),
      ReactDOM   = require('react-dom'),
      Bacon   = require('baconjs'),
      ChatApp   = require('./chatApp.jsx'),
      Messages   = require('./messages.js'),
      Users   = require('./users.js'),
      Events   = require('./events.js');

var socket = io('http://localhost:4000', {
    path: '/socket.io'
});

socket.on('connect', function () {
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('disconnect from server');
});

var messages = new Messages(socket);
var users = new Users(socket);
var events = new Events(socket);

const appState = Bacon.combineTemplate({
    messages: messages.all,
    users: users.userList,
});

appState.onValue((state) => {
    ReactDOM.render(<ChatApp {...state} events={events} />, document.getElementById('root'));
});
