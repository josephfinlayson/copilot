/**
 * Created by joe on 29/05/15.
 */

import React from 'react';
import _ from 'lodash';

import Router from 'react-router';
// import injectTapEventPlugin from 'react-tap-event-plugin';

// injectTapEventPlugin();

var Link = Router.Link;

var Minis = React.createClass({
  handleClick(event) {
    const el = event.target,
          activated = JSON.parse(localStorage.getItem('activated-mini-apps')) || [];
    activated.push(el.textContent);
    localStorage.setItem('activated-mini-apps', JSON.stringify(activated));
    el.parentNode.classList.add('activated');
  },
  _touch: {
    // started
  },
  touch(event) {
    const now = Date.now(),
          el = event.target,
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
            JSON.stringify(_.without(activated(), el.textContent))
          );
          el.parentNode.classList.remove('activated');
        } else if (duration > 0) {
          return this.handleClick(event);
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

    return (
      <div>
        {_.chunk(minis, 2).map((minis2, i) => {
          const link0 = minis[i*2].route ?
            <Link to={minis[i*2].route}
                  className="col"
                  onTouchStart={this.touch}
                  onTouchEnd={this.touch}
                  onTouchCancel={this.touch}
                  onTouchMove={this.touch}>
              <div className="vert-helper"></div>
              <img src={`build/img/icon-${i*2+1}.png`}/>
            </Link> :
            <div className="col"
                 onTouchStart={this.touch}
                 onTouchEnd={this.touch}
                 onTouchCancel={this.touch}
                 onTouchMove={this.touch}>
              <div className="vert-helper"></div>
              <img src={`build/img/icon-${i*2+1}.png`}/>
            </div>;
          const link1 = minis[i*2+1].route ?
            <Link to={minis[i*2].route}
                  className="col"
                  onTouchStart={this.touch}
                  onTouchEnd={this.touch}
                  onTouchCancel={this.touch}
                  onTouchMove={this.touch}>
              <div className="vert-helper"></div>
              <img src={`build/img/icon-${i*2+2}.png`}/>
            </Link> :
            <div className="col"
                 onTouchStart={this.touch}
                 onTouchEnd={this.touch}
                 onTouchCancel={this.touch}
                 onTouchMove={this.touch}>
              <div className="vert-helper"></div>
              <img src={`build/img/icon-${i*2+2}.png`}/>
            </div>;
          return (
            <div key={i} className="row minis">
              {link0}
              {link1}
            </div>
          );
        })}
      </div>
    );
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
