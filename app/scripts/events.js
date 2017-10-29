const Bacon = require('baconjs');

var Events = class Events {
    constructor(socket) {
        this.socket = socket;

        //Login event
        this.login = new Bacon.Bus();
        this.login.onValue((name) => {
            console.log('register', name);
            this.socket.emit('register', {
                name: name
            });
        });

        //New message event
        this.newMessage = new Bacon.Bus();
        this.newMessage.onValue((message) => {
            if (message.length > 0) {
                socket.emit('createMessage', {
                    text: message
                });
            }
        });

        //Location request event
        this.locating = new Bacon.Bus();
        this.locationRequest = () => {
            this.locating.push(true);
            return Bacon.fromPromise(new Promise(function(resolve, reject) {
               if (!navigator.geolocation) {
                   reject('Geolocation not supported by browser');
               }
               navigator.geolocation.getCurrentPosition(function (position) {
                   resolve(position);
               }, function () {
                   reject('Unable to fetch location');
               });
           })).onValue((location) => {
               this.locating.push(false);
               socket.emit('createLocationMessage', {
                   latitude: location.coords.latitude,
                   longitude: location.coords.longitude
               });
           });
       };

       //Update locating status
       this.locatingStatus = this.locating.scan(false, function(oldStatus, status) {
           return status;
       });
    }
};

module.exports = Events;
