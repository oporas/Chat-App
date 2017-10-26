const moment = require('moment');
var generateMessage = (from, text) => {
    return {
        type: 'text',
        from,
        text,
        createdAt: moment().valueOf()
    };
};
var generateRegisteredMessage = (oldName, newName) => {
    return {
        type: 'text',
        from: 'Admin',
        text:  `${oldName} is now known as ${newName}`,
        createdAt: moment().valueOf()
    };
};
var generateLocationMessage = (from, latitutude, longitude) => {
    return {
        type: 'location',
        from,
        url: `https://www.google.com/maps?q=${latitutude},${longitude}`,
        createdAt: moment().valueOf()
    };
};

module.exports = {generateMessage, generateLocationMessage, generateRegisteredMessage};
