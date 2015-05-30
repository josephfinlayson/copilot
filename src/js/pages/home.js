/**
 * Created by joe on 29/05/15.
 */

import React from 'react';
import _ from 'lodash';

import Router from 'react-router';
// import injectTapEventPlugin from 'react-tap-event-plugin';

// injectTapEventPlugin();

var Link = Router.Link;

const isActivated = name => {
  const activated = JSON.parse(localStorage.getItem('activated-mini-apps')) || [];
  console.log(activated, name, !!~activated.indexOf(name));
  return ~activated.indexOf(name);
};

var Minis = React.createClass({
  handleClick(name) {
    const activated = JSON.parse(localStorage.getItem('activated-mini-apps')) || [];
    if (isActivated(name)) {
      console.log('INCLUDES');
    } else {
      activated.push(name);
      localStorage.setItem('activated-mini-apps', JSON.stringify(activated));
      document.querySelector('.'+_.kebabCase(name)).classList.add('activated');
    }
  },
  _touch: {
    // started
  },
  touch(event, name) {
    const now = Date.now(),
          type = event.type;
    if (type === 'touchstart') {
      this._touch.started = Date.now();
    } else if (type === 'touchend') {
      const duration = this._touch.started && now - this._touch.started;
      event.preventDefault();
      event.stopPropagation();
      if (duration > 300) {
        const activated = () => JSON.parse(localStorage.getItem('activated-mini-apps')) || [];
        localStorage.setItem(
          'activated-mini-apps',
          JSON.stringify(_.without(activated(), name))
        );
        document.querySelector('.'+_.kebabCase(name)).classList.remove('activated');
      } else if (duration > 0) {
        return this.handleClick(name);
      }
      delete this._touch.started;
    } else if (type === 'touchcancel') {
      delete this._touch.started;
    } else if (type === 'touchmove') {
      delete this._touch.started;
    }
  },
  render() {
    const minis = this.props.minis;
    return (<div>
      {minis.map((mini, i) => {
        const shouldBeActivated = isActivated(mini.name);
        const handle = event => this.touch(event, mini.name);

        return (
          <div className="card minis"
               onTouchStart={handle}
               onTouchEnd={handle}
               onTouchCancel={handle}
               onTouchMove={handle}
               key={i}>
            <div className={
              "item item-image" + (shouldBeActivated ? " activated" : "") + " " + _.kebabCase(mini.name)
            }>
              <img src={`build/img/icon-${i+1}.png`}/>
            </div>
            <div className="item item-divider">
              {mini.name}
            </div>
          </div>
        );
      })}
    </div>);
  }
});

var App = React.createClass({
  render() {
    const minis = [
      {
        name: 'CrimeMapper',
        logo: '',
        route: 'crimeMapper'
      },{
        name: 'SOS',
        logo: '',
        route: 'SOS'
      },{
        name: 'example app 3',
        logo: '',
        route: ''
      },{
        name: 'example app 4',
        logo: '',
        route: ''
      },{
        name: 'example app 5',
        logo: '',
        route: ''
      },{
        name: 'example app 6',
        logo: '',
        route: ''
      },{
        name: 'example app 7',
        logo: '',
        route: ''
      },{
        name: 'example app 8',
        logo: '',
        route: ''
      }
    ];
    return (<Minis minis={minis}/>);
  }
});

export default App;
