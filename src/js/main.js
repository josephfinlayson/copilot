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
import guardian from './pages/alarm';
import health from './pages/health';
import SOS from './pages/SOS';
import addContacts from './pages/addContacts';
import phoneContacts from './pages/phoneContacts';
import AssistanceButton from './components/assistanceButton';

//router
import Router from 'react-router';
import Modal from 'react-modal';

Modal.setAppElement(document.querySelector('#app'));

// injectTapEventPlugin();
attachFastClick(document.body);

var Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    NotFoundRoute = Router.NotFoundRoute,
    Redirect = Router.Redirect,
    RouteHandler = Router.RouteHandler,
    Link = Router.Link;

var App = React.createClass({
    mixins: [Router.Navigation, Router.State],
    render() {
      const isHome = this.getPathname() === '/';
      const goSettings = _.partial(this.transitionTo, 'settings');
      return (
        <div>
          <div className="bar-dark bar bar-header disable-user-behavior">
            <button className="button button-clear" onClick={
              isHome ? goSettings : this.goBack
            }>{
              isHome ? '☰' : '〈 Back'
            }</button>

            <h1 className="title">CoPilot</h1>

            <AssistanceButton assistanceType="health" />
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
    <Route name="guardian" handler={guardian} />
    <Route name="health" path="health" handler={health} />
    <Route name="SOS" path="sos" handler={SOS} />
    <Route name="addContacts" path="/sos/addContacts" handler={addContacts} />
    <Route name="phoneContacts" path="/sos/phoneContacts" handler={phoneContacts} />
    <Route name="settings"
        handler={settingsPage}
        path="/settings" />

</Route>
);

React.initializeTouchEvents(true)

Router.run(routes, function (Handler) {
    React.render(<Handler />, document.querySelector('#app'));
});
