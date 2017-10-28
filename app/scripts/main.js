const socket = io('http://localhost:4000', {
    path: '/socket.io'
});

socket.on('connect', function () {
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('disconnect from server');
});

var messages = Bacon.fromBinder((sink) => {
    socket.on('newMessage', function (message) {
        console.log('newMessage', message);
        sink(message)
    });
    socket.on('setup', function (messages) {
        for (var message of messages) {
            sink(message)
        }
    });
});

messages.onValue(function(message) {
    $('#chat').append(getMessageContent(message));
});

var sendMessage = $("#message").asEventStream("submit", function(event, args) {
    event.preventDefault()
    var input = $("#message input");
    var message = input.val();
    input.val('');
    return message
})

sendMessage.onValue(function(message) {
    socket.emit('createMessage', {
        text: message
    });
})

var login = $("#name").asEventStream("submit", function(event, args) {
    event.preventDefault()
    var input = $("#name input");
    var name = input.val();
    input.val('');
    return name
})

login.onValue(function(name) {
    socket.emit('register', {
        name: name
    });
});

var usersContainer = $('#users');
var users = Bacon.fromBinder((sink) => {
    socket.on('users', function (users) {
        console.log('users', users);
        sink(users)
    });
});

users.onValue(function(users) {
    usersContainer.html('');
    users.forEach(function(user) {
        var li = $('<li></li>');
        li.text(`${user}`);
        usersContainer.append(li);
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
var sendLocationRequest = locationBtn.asEventStream("click", function(event, args) {
    return Bacon.fromPromise(new Promise(function(resolve, reject) {
       if (!navigator.geolocation) {
           reject('Geolocation not supported by browser');
       }
       navigator.geolocation.getCurrentPosition(function (position) {
           resolve(position);
       }, function () {
           reject('Unable to fetch location');
       });
   }));
})

sendLocationRequest.onValue((location) => {
    locationBtn.attr('disabled', 'disabled');
    locationBtn.text('Location...');
    location.onValue((position) => {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationBtn.removeAttr('disabled');
        locationBtn.text('Send location');
    });
});
