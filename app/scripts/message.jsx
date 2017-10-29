const React    = require('react'),
      moment    = require('moment');

module.exports = class Message extends React.Component {
    constructor(props) {
        super(props);
    }

    getMessageContent(message) {
        var formattedTime = moment(message.createdAt).format('h:mm a');
        if (message.type === 'location') {
            return <li>{formattedTime}: {message.from}: <a target="_black" href="{message.url}">My location</a></li>;
        }
        return  <li>{formattedTime}: {message.from}: {message.text}</li>;
    }

    render() {
        return (
            this.getMessageContent(this.props.message)
        )
    }

}
