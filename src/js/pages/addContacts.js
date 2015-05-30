
import React from 'react';

var App = React.createClass({
    render() {
        return (
		    <div className="wrapper sos">
		        <h1>Add New Contact</h1>
		        <label >Name:</label>
		        <input type="text" name="name" id="name" placeholder="Contact Name"  > </input>

		        <label >Number:</label>
		        <input type="tel" name="number" id="number" placeholder="Contact Number" />

		        <a href="#" id="addContact" className="ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini">Add Contact</a>
		    </div>
        )
    }
});

export default App;