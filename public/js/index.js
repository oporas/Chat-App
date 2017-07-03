var socket = io();

socket.on('connect', function () {
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('disconnect from server');
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = $('<li></li>')
    li.text(`${message.from}: ${formattedTime}: ${message.text}`);

    $('#chat').append(li)
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = $('<li></li>')
    var a = $('<a target="_black">My location</a>')
    a.attr('href', message.url)
    li.text(`${message.from}: ${formattedTime}: `);
    li.append(a);
    $('#chat').append(li)
});

var locationBtn = $('#send-location');
locationBtn.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by browser')
    }

    locationBtn.attr('disabled', 'disabled');
    locationBtn.text('Sending location...');


    navigator.geolocation.getCurrentPosition(function (position) {
        locationBtn.removeAttr('disabled');
        locationBtn.text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationBtn.removeAttr('disabled');
        locationBtn.text('Send location');
        return alert('Unable to fetch location')
    })
})

$('#message-form').on('submit', function (e) {
    e.preventDefault();
    var textBox = $('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: textBox.val()
    }, function (data) {
        textBox.val('')
    })
})
