const _ = require('lodash');
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const Bacon = require('baconjs').Bacon;
const hbs = require('hbs');

const {generateMessage, generateLocationMessage, generateRegisteredMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(publicPath));
var server = require('http').createServer(app);
var io = socketIO(server);
// io.serveClient(false);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`App is up in port ${port}`);
});

server.listen(4000, () => {
    console.log(`Socket server is up in port ${4000}`);
});

var connections = Bacon.fromBinder((sink) => {
    io.on('connection', sink);
});

var messages = connections.flatMap((socket) => {
    return Bacon.fromBinder((sink) => {
        socket.on('createMessage', (message) => {
            sink(generateMessage(getNameOrId(socket), message.text));
        });
        socket.on('createLocationMessage', (coords) => {
            sink(generateLocationMessage(getNameOrId(socket), coords.latitude, coords.longitude));
        });
        socket.on('register', (message) => {
            sink(generateRegisteredMessage(getNameOrId(socket), message.name));
            socket.name = message.name;
            updateUser.push( socket );
        });
        socket.on('disconnect', () => {
            userLeft.push(socket);
        });
    });
});

function Users([], addUser, removeUser, updateUser) {
    return Bacon.update([],
        addUser, function(users, newUser) { return users.concat({id: newUser.id, name: newUser.name}) },
        removeUser, function(users, removedUser) { return _.reject(users, (el) => { return el.id === removedUser.id }) },
        updateUser, function(users, updateUser) { return users.map((el, i) => {return (el.id == updateUser.id) ? updateUser : el }) }
    );
}

var newUser = new Bacon.Bus(),
updateUser = new Bacon.Bus(),
userLeft = new Bacon.Bus();

var userList = Users([], newUser, userLeft, updateUser);

userList.onValue((users) => {
    io.emit('users', users.map(function(i) {
        return i.name ? i.name : 'Unnamed';
    }));
});

connections.onValue(function(socket) {
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New challenger appears'));
    newUser.push(socket);
});

messages.onValue(function(message) {
    io.emit('newMessage', message);
});
