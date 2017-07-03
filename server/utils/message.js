const moment = require('moment');
var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    }
}
var generateLocationMessage = (from, latitutude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitutude},${longitude}`,
        createdAt: moment().valueOf()
    }
}

module.exports = {generateMessage, generateLocationMessage}
