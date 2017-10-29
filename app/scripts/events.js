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
    }
};


module.exports = Events;
