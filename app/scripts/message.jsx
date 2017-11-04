const React    = require('react'),
      moment   = require('moment');

module.exports = class Message extends React.Component {
    getMessageContent(message) {
        const formattedTime = moment(message.createdAt).format('h:mm a');
        const className = message.from == 'System' ? 'system-message' : '';
        const imageRegex = /(https?:\/\/.*\.(?:png|jpg|gif|jpeg|webp))/i;
        const hasImage = imageRegex.exec(message.text);
        if (message.type === 'location') {
            return <li className={className}>{formattedTime}: {message.from}: <a target="_black" href={message.url}>My location</a></li>;
        }
        if (hasImage) {
            return <li className={className}>{formattedTime}: {message.from}: {message.text} <img className="image" src={hasImage[0]} /></li>;
        }
        return <li className={className}>{formattedTime}: {message.from}: {message.text}</li>;
    }

    render() {
        return (
            this.getMessageContent(this.props.message)
        );
    }
};
