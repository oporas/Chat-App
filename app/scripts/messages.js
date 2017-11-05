const Bacon = require('baconjs');

module.exports = class Messages {
    constructor(socket) {
        this.socket = socket;
        this.newMessageEvent = Bacon.fromBinder((sink) => {
            //single new message
            this.socket.on('newMessage', (message) => {
                console.log('newMessage', message);
                sink(message);
            });
            //Chat setup - list of messages
            this.socket.on('setup', (messages) => {
                console.log('setup', messages);
                messages.map(sink);
            });
        });

        //List of all received messages
        this.all = this.newMessageEvent.scan([], (log, message) => {
            return log.concat(message);
        });
    }
};
