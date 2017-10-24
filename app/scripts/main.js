const socket = io('http://localhost:4000', {
    path: '/socket.io'
});

socket.on('connect', function () {
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('disconnect from server');
});

socket.on('newMessage', function (message) {
    console.log('newMessage', message);
    $('#chat').append(getMessageContent(message));
});

socket.on('users', function (users) {
    console.log('users', users);
    var container = $('#users');
    container.html('');
    users.forEach(function(user) {
        var li = $('<li></li>');
        li.text(`${user}`);
        container.append(li);
    });
});

function getMessageContent(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = $('<li></li>');
    if (message.type === 'location') {
        var a = $('<a target="_black">My location</a>');
        a.attr('href', message.url);
        li.text(`${formattedTime}: ${message.from}: `);
        li.append(a);
    } else {
        li.text(`${formattedTime}: ${message.from}: ${message.text}`);
    }
    return li;
}

var locationBtn = $('#send-location');
locationBtn.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by browser');
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
        return alert('Unable to fetch location');
    });
});

$('#name').on('submit', function (e) {
    e.preventDefault();
    var textBox = $('[name=name]');
    socket.emit('register', {
        name: textBox.val()
    }, function (data) {
        textBox.val('');
    });
});

$('#message-form').on('submit', function (e) {
    e.preventDefault();
    var textBox = $('[name=message]');
    socket.emit('createMessage', {
        text: textBox.val()
    }, function (data) {
        textBox.val('');
    });
});
