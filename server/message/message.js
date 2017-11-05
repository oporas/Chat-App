const moment = require('moment');
const generateMessage = (from, text) => {
    return {
        type: 'text',
        from,
        text,
        createdAt: moment().valueOf()
    };
};
const generateRegisteredMessage = (oldName, newName) => {
    return {
        type: 'text',
        from: 'System',
        text:  `${oldName} is now known as ${newName}`,
        createdAt: moment().valueOf()
    };
};
const generateLocationMessage = (from, latitutude, longitude) => {
    return {
        type: 'location',
        from,
        url: `https://www.google.com/maps?q=${latitutude},${longitude}`,
        createdAt: moment().valueOf()
    };
};

module.exports = {generateMessage, generateLocationMessage, generateRegisteredMessage};
