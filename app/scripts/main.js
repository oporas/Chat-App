const React     = require('react'),
      ReactDOM  = require('react-dom'),
      Bacon     = require('baconjs'),
      ChatApp   = require('./chatApp.jsx'),
      Messages  = require('./messages.js'),
      Users     = require('./users.js'),
      Events    = require('./events.js');

const socket = io('http://localhost:4000', {
    path: '/socket.io'
});

socket.on('connect', () => {
    console.log('connected to server');
});

socket.on('disconnect', () => {
    console.log('disconnect from server');
});

const messages = new Messages(socket);
const users = new Users(socket);
const events = new Events(socket);

const appState = Bacon.combineTemplate({
    messages: messages.all,
    users: users.userList,
    locating: events.locatingStatus,
});

appState.onValue((state) => {
    ReactDOM.render(<ChatApp {...state} events={events} />, document.getElementById('root'));
});
