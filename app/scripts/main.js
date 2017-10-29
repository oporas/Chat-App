
const React   = require('react'),
      ReactDOM   = require('react-dom'),
      Bacon   = require('baconjs'),
      ChatApp   = require('./chatApp.jsx'),
      Messages   = require('./messages.js')

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

const appState = Bacon.combineTemplate({
    messages: messages.all
})

appState.onValue((state) => {
    ReactDOM.render(<ChatApp {...state} />, document.getElementById('root'))
})
