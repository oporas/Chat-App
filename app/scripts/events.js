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
        this.locationRequest = () => {
            trigger(document, 'locating', {detail: true});
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
               trigger(document, 'locating', {detail: false});
               socket.emit('createLocationMessage', {
                   latitude: location.coords.latitude,
                   longitude: location.coords.longitude
               });
           });
       };

       //Listen to triggered locating events
       this.locating = Bacon.fromBinder((sink) => {
           document.addEventListener('locating', function(e) {
               sink(e.detail);
           });
       });

       //Update locating status
       this.locatingStatus = this.locating.scan(false, function(oldStatus, status) {
           return status;
       });
    }
};

//Custom event trigger
function trigger(el, eventName, options) {
    var event;
    if (window.CustomEvent) {
        event = new CustomEvent(eventName, options);
    } else {
        event = document.createEvent('CustomEvent');
        event.initCustomEvent(eventName, true, true, options);
    }
    el.dispatchEvent(event);
}

module.exports = Events;
