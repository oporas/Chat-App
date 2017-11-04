const React     = require('react'),
      Message   = require('./message.jsx'),
      Inputs    = require('./inputs.jsx'),
      Sidebar   = require('./sidebar.jsx');

module.exports = (props) => {
    return (
        <div className="app">
            <div className="chat">
                <ol id="chat" className="messages">
                {props.messages.map((message, i) => {
                    return <Message message={message} key={i} />;
                })}
                </ol>
                <Inputs events={props.events} locating={props.locating} />
            </div>
            <Sidebar users={props.users} events={props.events} />
        </div>
    );
};
