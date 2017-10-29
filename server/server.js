const _ = require('lodash');
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const Bacon = require('baconjs').Bacon;
const hbs = require('hbs');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

//Setup server
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

//Shows users as 'Unnamed' if name not given
var getName = (socket) => {
    return socket.name ? socket.name : 'Unnamed';
};

var messages = connections.flatMap((socket) => {
    return Bacon.fromBinder((sink) => {
        //Default message
        socket.on('createMessage', (message) => {
            sink(generateMessage(getName(socket), message.text));
        });
        //Location message
        socket.on('createLocationMessage', (coords) => {
            sink(generateLocationMessage(getName(socket), coords.latitude, coords.longitude));
        });
        //Register event, user name added
        socket.on('register', (message) => {
            sink(generateRegisteredMessage(getName(socket), message.name));
            socket.name = message.name;
            updateUser.push( socket );
        });
        //User disconnected
        socket.on('disconnect', () => {
            userLeft.push(socket);
        });
    });
});

//User list updated
userList.onValue((users) => {
    io.emit('users', users.map((i) => {
        return getName(i);
    }));
});

/*
    New connection
    - Send last (10) messages from chat
    - Send welcome message
    - Send new message to other users
*/
connections.onValue((socket) => {
    socket.emit('setup', _.takeRight(log, 10));
    socket.emit('newMessage', generateMessage('System', 'Welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('System', 'A challenger appears'));
    newUser.push(socket);
});

//New message sent, save to log
messages.onValue((message) => {
    io.emit('newMessage', message);
    log.push(message);
});
