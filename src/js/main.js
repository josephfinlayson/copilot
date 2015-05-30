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
                <div className="bar-positive bar bar-header disable-user-behavior">
                    <h1 className="title">Ionic Styled header bar</h1>
</div>
                    <div className="scroll-content ionic-scroll">
                        <div className="scroll">
                            <RouteHandler/>
                        </div>
                    </div>

            </div>
        )
    }
});

var routes = (
    <Route handler={App} path="/">
        <DefaultRoute handler={homePage} />
        <Route name="about" handler={settingsPage} />
        <Route name="crimeMapper" handler={crimeMapper} />
        <Route name="crimeAlarm" handler={crimeAlarm} />
    </Route>

);

Router.run(routes, function (Handler) {
    React.render(<Handler />, document.querySelector('#app'));
});
