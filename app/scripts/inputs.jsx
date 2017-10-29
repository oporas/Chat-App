const React    = require('react')

module.exports = class Inputs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {message: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLocation = this.handleLocation.bind(this);
    }

    handleChange(event) {
        this.setState({message: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.events.newMessage.push(this.state.message);
        this.setState({message: ''});
    }

    handleLocation(event) {
        event.preventDefault();
        this.props.events.locationRequest();
    }

    render() {
        return (
            <div className="inputs">
                <form id="message" onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Message" autoFocus autoComplete="off" value={this.state.message} onChange={this.handleChange}/>
                    <button>Send</button>
                </form>
                <button onClick={this.handleLocation} id="send-location" className="send-location">{this.props.locating ? 'Locating...' : 'Send location'}</button>
            </div>
        );
    }

};
