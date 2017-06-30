var socket = io();

socket.on('connect', function () {
    console.log('connected to server');

    socket.emit('createMessage', {
        from: 'test@test.com',
        text: 'Testing jooh'
    })
});

socket.on('disconnect', function () {
    console.log('disconnect from server');
});

socket.on('newMessage', function (message) {
    console.log('New message', message);
});
