const React    = require('react')

module.exports = class Inputs extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="inputs">
                <form id="message">
                    <input type="text" placeholder="Message" autofocus autocomplete="off"/>
                    <button>Send</button>
                </form>
                <button id="send-location" class="send-location">Send location</button>
            </div>
        )
    }

}
