const Bacon = require('baconjs');

module.exports = class Users {
    constructor(socket) {
        this.socket = socket;
        this.userList = Bacon.fromBinder((sink) => {
            //User list has been updated
            socket.on('users', (users) => {
                console.log('users', users);
                sink(users);
            });
        });
    }
};
