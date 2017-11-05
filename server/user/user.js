const _ = require('lodash');
const Bacon = require('baconjs').Bacon;

const newUser = new Bacon.Bus(),
userLeft = new Bacon.Bus(),
updateUser = new Bacon.Bus();

//List of all users
const userList = Bacon.update([],
    newUser, (users, newUser) => {
        return users.concat({id: newUser.id, name: newUser.name });
    },
    userLeft, (users, removedUser) => {
        return _.reject(users, (el) => { return el.id === removedUser.id; });
    },
    updateUser, (users, updateUser) => {
        return users.map((el, i) => {return (el.id == updateUser.id) ? updateUser : el; });
    }
);

module.exports = {userList, newUser, userLeft, updateUser};
