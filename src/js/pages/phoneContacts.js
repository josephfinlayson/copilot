
import React from 'react';

var App = React.createClass({
    render() {
        return (
		<div className="wrapper">
            <ul data-role="listview" data-inset="true" className="ui-listview ui-listview-inset ui-corner-all ui-shadow">
                <li data-icon="plus" className="ui-first-child"><a href="add.html" className="ui-btn ui-btn-icon-right ui-icon-plus">Add New Contact</a>
                </li>
                <li data-icon="search" className="ui-last-child"><a href="find.html" className="ui-btn ui-btn-icon-right ui-icon-search">Find Contact</a>
                </li>
            </ul>
        </div>
        )
    }
});

export default App;