var socket = io();

socket.on('connect', function () {
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('disconnect from server');
});

socket.on('newMessage', function (message) {
    console.log('New message', message);
    var li = $('<li></li>')
    li.text(`${message.from}: ${message.text}`);

    $('#chat').append(li)
});

socket.on('newLocationMessage', function (message) {
    var li = $('<li></li>')
    var a = $('<a target="_black">My location</a>')
    a.attr('href', message.url)
    li.text(`${message.from}: `);
    li.append(a);
    $('#chat').append(li)
});

var locationBtn = $('#send-location');
locationBtn.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by browser')
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        return alert('Unable to fetch location')
    })
})

$('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function (data) {
        console.log('Got it', data);
    })
})
