const Bacon = require('baconjs');

module.exports = class Users {
    constructor(socket) {
        this.socket = socket;
        this.userList = Bacon.fromBinder((sink) => {
            socket.on('users', function (users) {
                console.log('users', users);
                sink(users);
            });
        });
    }
};
