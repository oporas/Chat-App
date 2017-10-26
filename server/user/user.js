const _ = require('lodash');
const Bacon = require('baconjs').Bacon;

function Users([], addUser, removeUser, updateUser) {
    return Bacon.update([],
        addUser, function(users, newUser) { return users.concat({id: newUser.id, name: newUser.name}) },
        removeUser, function(users, removedUser) { return _.reject(users, (el) => { return el.id === removedUser.id }) },
        updateUser, function(users, updateUser) { return users.map((el, i) => {return (el.id == updateUser.id) ? updateUser : el }) }
    );
}

var newUser = new Bacon.Bus(),
updateUser = new Bacon.Bus(),
userLeft = new Bacon.Bus();
var userList = Users([], newUser, userLeft, updateUser);

module.exports = {userList, newUser, userLeft, updateUser};
