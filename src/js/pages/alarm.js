/**
 * Created by joe on 29/05/15.
 */
import React from 'react';
import Router from 'react-router';
import $ from 'jquery';

var RouteHandler = Router.RouteHandler,
    Link = Router.Link;


var App = React.createClass({
    panicCall() {
        var obj = localStorage.getItem('contacts');
        if ((obj === undefined) || (obj == null) || (obj == "undefined")) {
            obj = {};
        }
        console.log('oldObject: ', obj);
        try {
            obj = JSON.parse(obj)
        } catch (e) {
            obj = {};
        }

        var users = []
        for(var key in obj) {
            users.push({
                name: key,
                phone: obj[key]
            })
        }
        var data = {
            users: users,
            message: "form app"
        };

        $.ajax({
            type: 'POST',
            url: 'http://sosapi.herokuapp.com/panic/amber',
            data: JSON.stringify(data),
            contentType:'text/plain; charset=utf-8'
        })

        // $.post('http://localhost:8888/panic/amber', data, function(a){console.log(a)}, 'json')
    },
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
            <button onClick={this.confirmServiceRequest}
                className="button button-energized">
                I need assistance from friends  
                
            </button>
                      <button onClick={this.confirmServiceRequest}
                className="button button-positive">
                I am feeling unsafe
            </button>
                      <button onClick={this.panicCall}
                className="button button-assertive">
                I am in immediate danger
            </button>
        </div>

            

   
        )
    }
});

export default App;