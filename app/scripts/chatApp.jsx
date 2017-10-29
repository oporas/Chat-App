
const React     = require('react'),
      Message   = require('./message.jsx'),
      Inputs    = require('./inputs.jsx'),
      Sidebar   = require('./sidebar.jsx');

module.exports = class chatApp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app">
                <div className="chat">
                    <ol id="chat" className="messages">
                    {this.props.messages.map(function(message, i){
                        return <Message message={message} key={i} />;
                    })}
                    </ol>
                    <Inputs events={this.props.events} locating={this.props.locating} />
                </div>
                <Sidebar users={this.props.users} events={this.props.events} />
            </div>
        );
  }
};
