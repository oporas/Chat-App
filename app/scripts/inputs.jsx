const React    = require('react')

module.exports = class Inputs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {message: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({message: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.events.newMessage.push(this.state.message);
        this.setState({message: ''});
    }

    render() {
        return (
            <div className="inputs">
                <form id="message" onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Message" autoFocus autoComplete="off" value={this.state.message} onChange={this.handleChange}/>
                    <button>Send</button>
                </form>
                <button id="send-location" className="send-location">Send location</button>
            </div>
        )
    }

}
