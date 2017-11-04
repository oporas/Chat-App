const React = require('react');

module.exports = ({events, users}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        events.login.push(e.target.elements.name.value);
        e.target.elements.name.value = '';
    };

    const handleLocation = (e) => {
        e.preventDefault();
        events.locationRequest();
    };

    return (
        <div className="sidebar">
             <h3>Users</h3>
             <ul id="users">
                 {users.map((user, i) => {
                     return <li key={i}>{user}</li>;
                 })}
             </ul>
             <form id="name" onSubmit={handleSubmit}>
                 <input type="text" name="name" placeholder="Name" autoComplete="off" />
                 <input type="submit" value="Update" />
             </form>
         </div>
    );
};
