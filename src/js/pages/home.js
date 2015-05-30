/**
 * Created by joe on 29/05/15.
 */

import React from 'react';
import _ from 'lodash';
// import injectTapEventPlugin from 'react-tap-event-plugin';

// injectTapEventPlugin();

var Minis = React.createClass({
  tap(event) {
    const el = event.target,
          activated = JSON.parse(localStorage.getItem('activated-mini-apps')) || [];
    console.log(`tapped ${el.textContent}`);
    if (confirm(`Do you want to activate ${el.textContent}?`)) {
      console.log('YES');
      activated.push(el.textContent);
      localStorage.setItem('activated-mini-apps', JSON.stringify(activated));
      console.log(activated);
    }
  },
  _touch: {
    // started
  },
  touch(event) {
    const now = Date.now(),
          el = event.target;
    switch (event.type) {
      case 'touchstart':
        console.log('start');
        this._touch.started = Date.now();
        break;
      case 'touchend':
        event.preventDefault();
        event.stopPropagation();
        if (this._touch.started && now - this._touch.started > 500) {
          const activated = JSON.parse(localStorage.getItem('activated-mini-apps')) || [];
          localStorage.setItem(
            'activated-mini-apps',
            JSON.stringify(_.without(activated, el.textContent))
          );
          console.log('hold');
        }
        delete this._touch.started;
        break;
      case 'touchcancel':
        delete this._touch.started;
        break;
      default:
        return false;
    }
  },
  render() {
    const minis = this.props.minis;
    return (
      <div>
        {_.chunk(minis, 2).map((minis2, i) => (
          <div key={i} className="row">
            <div className="col"
                 onClick={this.tap}
                 onTouchStart={this.touch}
                 onTouchEnd={this.touch}
                 onTouchCancel={this.touch}>{minis2[0].name}</div>
            <div className="col"
                 onClick={this.tap}
                 onTouchStart={this.touch}
                 onTouchEnd={this.touch}
                 onTouchCancel={this.touch}>{minis2[1].name}</div>
          </div>
        ))}
      </div>
    );
  }
});

var App = React.createClass({
  render() {
    const minis = [
      {
        name: 'SOS',
        logo: ''
      },{
        name: 'CrimeMapper',
        logo: ''
      },{
        name: 'example app',
        logo: ''
      },{
        name: 'example app',
        logo: ''
      },{
        name: 'example app',
        logo: ''
      },{
        name: 'example app',
        logo: ''
      },{
        name: 'example app',
        logo: ''
      },{
        name: 'example app',
        logo: ''
      }
    ];
    return (
      <div>
        <h1>HOMEPAGE</h1>
        <Minis minis={minis}/>
      </div>
    );
  }
});

export default App;
