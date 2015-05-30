
import React from 'react';

var App = React.createClass({
	getInitialState() {
		return {
			name: '',
			number: ''
		};
	},
	handleChange1(event) {
		this.setState({name: event.target.value});
	},
	handleChange2(event) {
		this.setState({number: event.target.value});
	},
	addContact() {
		var obj = localStorage.getItem('contacts');
		if ((obj === undefined) || (obj == null) || (obj == "undefined")) {
			obj = {};
		}
		console.log('oldObject: ', obj);
		obj = JSON.parse(obj)
		obj[this.state.name] = this.state.number;
		localStorage.setItem('contacts', JSON.stringify(obj));
		console.log('newObject: ', obj);
	},
    render() {
        return (
		    <div className="wrapper sos">
		        <h1>Add New Contact</h1>
		        <label >Name:</label>
		        <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange1} placeholder="Contact Name" />

		        <label >Number:</label>
		        <input type="tel" name="number" id="number" value={this.state.number} onChange={this.handleChange2} placeholder="Contact Number" />

		        <button id="addContact" onClick={this.addContact} className="ui-shadow ui-btn ui-corner-all ui-btn-inline ui-btn-b ui-mini">Add Contact</button>
		    </div>
        )
    }
});

export default App;