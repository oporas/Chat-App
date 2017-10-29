const Bacon = require('baconjs');

module.exports = class Messages {
    constructor(socket) {
        this.socket = socket;
        this.newMessageEvent = Bacon.fromBinder((sink) => {
            this.socket.on('newMessage', function (message) {
                console.log('newMessage', message);
                sink(message);
            });
            this.socket.on('setup', function (messages) {
                console.log('setup', messages);
                for (var message of messages) {
                    sink(message);
                }
            });
        });

        this.all = this.newMessageEvent.scan([], function(log, message) {
            return log.concat(message);
        });
    }
};
