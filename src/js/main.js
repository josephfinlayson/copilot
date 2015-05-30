/* jshint -W030 */
'use strict';

import React from 'react';
import _ from 'lodash';
import attachFastClick from 'fastclick';
// import injectTapEventPlugin from 'react-tap-event-plugin';

//pages
import homePage from './pages/home';
import settingsPage from './pages/settings';
import crimeMapper from './pages/map';
import SOS from './pages/alarm';

//router
import Router from 'react-router';

// injectTapEventPlugin();
attachFastClick();

var Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    NotFoundRoute = Router.NotFoundRoute,
    Redirect = Router.Redirect,
    RouteHandler = Router.RouteHandler,
    Link = Router.Link;

var App = React.createClass({
    mixins: [Router.Navigation],
    render() {
      return (
        <div>
          <div className="bar-dark bar bar-header disable-user-behavior">
            <button className="button button-clear" onClick={this.goBack}>〈 Back</button>

            <h1 className="title">CoPilot</h1>

            <button className="button button-clear"
                    onClick={_.partial(this.transitionTo, 'settings')}>SOS</button>
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
    <Route path="map" name="crimeMapper" handler={crimeMapper} />
    <Route name="SOS" handler={SOS} />

    <Route name="settings"
        handler={settingsPage}
        path="/settings" />

</Route>
);

React.initializeTouchEvents(true)

Router.run(routes, function (Handler) {
    React.render(<Handler />, document.querySelector('#app'));
});
