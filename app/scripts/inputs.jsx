const React = require('react');

module.exports = ({events, locating}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        events.newMessage.push(e.target.elements.message.value);
        e.target.elements.message.value = '';
    };

    const handleLocation = (e) => {
        e.preventDefault();
        events.locationRequest();
    };

    return (
        <div className="inputs">
            <form id="message" onSubmit={handleSubmit}>
                <input type="text" name="message" placeholder="Message" autoFocus autoComplete="off" />
                <button>Send</button>
            </form>
            <button onClick={handleLocation} id="send-location" className="send-location" disabled={locating}>{locating ? 'Locating...' : 'Send location'}</button>
        </div>
    );
};
