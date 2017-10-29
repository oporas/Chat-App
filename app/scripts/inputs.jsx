const React    = require('react')

module.exports = class Inputs extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="inputs">
                <form id="message">
                    <input type="text" placeholder="Message" autoFocus autoComplete="off"/>
                    <button>Send</button>
                </form>
                <button id="send-location" className="send-location">Send location</button>
            </div>
        )
    }

}
