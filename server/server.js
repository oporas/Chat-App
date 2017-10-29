const _ = require('lodash');
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const Bacon = require('baconjs').Bacon;
const hbs = require('hbs');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(publicPath));
var server = require('http').createServer(app);
var io = socketIO(server);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`App is up in port ${port}`);
});

server.listen(4000, () => {
    console.log(`Socket server is up in port ${4000}`);
});

const {generateMessage, generateLocationMessage, generateRegisteredMessage} = require('./message/message');
const {userList, newUser, userLeft, updateUser} = require('./user/user');

var log = [];

var connections = Bacon.fromBinder((sink) => {
    io.on('connection', sink);
});

var getName = (socket) => {
    return socket.name ? socket.name : 'Unnamed';
};

var messages = connections.flatMap((socket) => {
    return Bacon.fromBinder((sink) => {
        socket.on('createMessage', (message) => {
            sink(generateMessage(getName(socket), message.text));
        });
        socket.on('createLocationMessage', (coords) => {
            sink(generateLocationMessage(getName(socket), coords.latitude, coords.longitude));
        });
        socket.on('register', (message) => {
            sink(generateRegisteredMessage(getName(socket), message.name));
            socket.name = message.name;
            updateUser.push( socket );
        });
        socket.on('disconnect', () => {
            userLeft.push(socket);
        });
    });
});

userList.onValue((users) => {
    io.emit('users', users.map(function(i) {
        return getName(i);
    }));
});

connections.onValue(function(socket) {
    socket.emit('setup', _.takeRight(log, 10));
    socket.emit('newMessage', generateMessage('System', 'Welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('System', 'A challenger appears'));
    newUser.push(socket);
});

messages.onValue(function(message) {
    io.emit('newMessage', message);
    log.push(message);
});
