/* jshint -W030 */
'use strict';

import React from 'react';

//pages
import homePage from './pages/home';
import settingsPage from './pages/settings';
import crimeMapper from './pages/map';
import crimeAlarm from './pages/alarm';

//router
import Router from 'react-router';

var Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    NotFoundRoute = Router.NotFoundRoute,
    Redirect = Router.Redirect,
    RouteHandler = Router.RouteHandler

var App = React.createClass({
    render() {
        return (
            <div>
                <h1>Co-pilot</h1>
                <RouteHandler/>
            </div>
        )
    }
});

var routes = (
<Route handler={App} path="/">
    <DefaultRoute handler={homePage} />
    <Route name="about" handler={settingsPage} />
    <Route path="map" name="crimeMapper" handler={crimeMapper} />
    <Route name="crimeAlarm" handler={crimeAlarm} />
</Route>

);

Router.run(routes, function (Handler) {
    React.render(<Handler />, document.body);
});
