/**
 * Created by joe on 29/05/15.
 */
import React from 'react';
import Router from 'react-router';

var RouteHandler = Router.RouteHandler,
    Link = Router.Link;


var App = React.createClass({
    render() {
        return (
		<div className="wrapper sos">
			<ul data-role="listview" data-inset="true" className="ui-listview ui-listview-inset ui-corner-all ui-shadow">
			<Link to="/sos/addContacts">
                <li data-icon="plus" className="ui-first-child"><a  className="ui-btn ui-btn-icon-right ui-icon-plus">Add New Contact</a>
                </li>
            </Link>
            <Link to="/sos/addContacts">
                <li data-icon="search" className="ui-last-child"><a className="ui-btn ui-btn-icon-right ui-icon-search">Find Contact</a>
                </li>
            </Link>
            </ul>

			<RouteHandler />
        </div>
        )
    }
});

export default App;