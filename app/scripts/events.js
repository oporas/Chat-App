const Bacon = require('baconjs');

//Event handler
module.exports = class Events {
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
            return Bacon.fromPromise(new Promise((resolve, reject) => {
                if (!navigator.geolocation) {
                    reject('Geolocation not supported by browser');
                }
                navigator.geolocation.getCurrentPosition((position) => {
                    resolve(position);
                }, () => {
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
        this.locatingStatus = Bacon.update(false,
        this.locating, (oldStatus, status) => { return status; });
    }
};
