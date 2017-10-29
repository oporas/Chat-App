const React = require('react');

module.exports = class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.events.login.push(this.state.name);
        this.setState({name: ''});
    }

    render() {
        return (
            <div className="sidebar">
                 <h3>Users</h3>
                 <ul id="users">
                     {this.props.users.map((user, i) => {
                         return <li key={i}>{user}</li>;
                     })}
                 </ul>
                 <form id="name" onSubmit={this.handleSubmit}>
                     <input type="text" placeholder="Name" autoComplete="off" value={this.state.name} onChange={this.handleChange}/>
                     <input type="submit" value="Update" />
                 </form>
             </div>
        );
    }

};
