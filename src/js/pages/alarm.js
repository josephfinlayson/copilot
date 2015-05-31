/**
 * Created by joe on 29/05/15.
 */
import React from 'react';
import Router from 'react-router';
import $ from 'jquery';

var RouteHandler = Router.RouteHandler,
    Link = Router.Link;


var App = React.createClass({
    getCurrentLocation() {
        let now = new Date();
        var deferred = $.Deferred();

        navigator.geolocation.getCurrentPosition(
            function (a) {
                console.log(a.coords)
                deferred.resolve(a.coords);
            },
            deferred.reject)

        return deferred.promise();

    },
    panicDegree1() {
        var self = this;
        this.getCurrentLocation()
            .then(function (coords) {
                console.log(coords)
                var mapsUrl = "http://maps.google.com/maps?z=12&t=m&q=loc:" + coords.latitude + "+" + coords.longitude;
                self.panicCall(" It's John Suhr. I'm feeling a bit unsafe right now. Could you give me a call? I'm at " + mapsUrl)
            })
        // this.panicCall(" I'm feeling a bit unsafe right now. Could you give me a call? I'm at ")
    },
    panicDegree2() {
        var self = this;
        this.getCurrentLocation()
            .then(function (coords) {
                console.log(coords)
                var mapsUrl = "http://maps.google.com/maps?z=12&t=m&q=loc:" + coords.latitude + "+" + coords.longitude;
                self.panicCall(" It's John Suhr. I'm feeling a very unsafe right now. Please give me a call immediately. If I don't let you know where I am sage in ten minutes, please call the police. I'm at " + mapsUrl)
            })
        // this.panicCall(" I'm feeling a very unsafe right now. Please give me a call immediately. If I don't let you know where I am sage in ten minutes, please call the police. I'm at")
    },
    panicDegree3() {
        var self = this;
        this.getCurrentLocation()
            .then(function (coords) {
                console.log(coords)
                var mapsUrl = "http://maps.google.com/maps?z=12&t=m&q=loc:" + coords.latitude + "+" + coords.longitude;
                self.panicCall(" It's John Suhr. I am in immediate danger. Please call the police immediately and tell them I am at this location." + mapsUrl)
            })

        window.open('tel:999','_blank');
        // this.panicCall("I am in immediate danger. Please call the police immediately and tell them I am at this location.")
    },
    panicCall(msg) {
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
            message: msg
        };

        $.ajax({
            type: 'POST',
            url: 'http://sosapi.herokuapp.com/panic/amber',
            data: JSON.stringify(data),
            contentType:'text/plain; charset=utf-8'
        })
        alert("Your contact(s) have now been notified!")
        // $.post('http://localhost:8888/panic/amber', data, function(a){console.log(a)}, 'json')
    },
    render() {
        return (
		<div className="wrapper sos">
			<ul data-role="listview" data-inset="true" className="ui-listview ui-listview-inset ui-corner-all ui-shadow new-contact">
			<Link to="/sos/addContacts">
                <li data-icon="plus" className="ui-first-child"><a  className="ui-btn ui-btn-icon-right ui-icon-plus">Add New Contact</a>
                </li>
            </Link>
            </ul>
            <button onClick={this.panicDegree1}
                className="button button-block health-button button-balanced">
                I need assistance from friends

            </button>
                      <button onClick={this.panicDegree2}
                className="button button-block health-button button-energized">
                I am feeling unsafe
            </button>
                      <button onClick={this.panicDegree3}
                className="button button-block health-button button-assertive">
                I am in immediate danger
            </button>
        </div>




        )
    }
});

export default App;