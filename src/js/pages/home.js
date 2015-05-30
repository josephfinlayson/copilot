/**
 * Created by joe on 29/05/15.
 */

import React from 'react';
import _ from 'lodash';
// import injectTapEventPlugin from 'react-tap-event-plugin';

// injectTapEventPlugin();

var Minis = React.createClass({
  handleClick(event) {
    const el = event.target,
          activated = JSON.parse(localStorage.getItem('activated-mini-apps')) || [];
    // console.log(`tapped ${el.textContent}`);
    // if (confirm(`Do you want to ACTIVATE ${el.textContent}?`)) {
      // console.log('YES');
      activated.push(el.textContent);
      localStorage.setItem('activated-mini-apps', JSON.stringify(activated));
      el.parentNode.classList.add('activated');
      // console.log(activated);
    // }
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
        // console.log(duration);
        event.preventDefault();
        event.stopPropagation();
        if (duration > 300) {
          // if (confirm(`Do you want to REMOVE ${el.textContent}?`)) {
            const activated = () => JSON.parse(localStorage.getItem('activated-mini-apps')) || [];
            localStorage.setItem(
              'activated-mini-apps',
              JSON.stringify(_.without(activated(), el.textContent))
            );
            el.parentNode.classList.remove('activated');
            // console.log(activated());
          // }
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
        {_.chunk(minis, 2).map((minis2, i) => (
          <div key={i} className="row minis">
            <div className="col"
                 onTouchStart={this.touch}
                 onTouchEnd={this.touch}
                 onTouchCancel={this.touch}
                 onTouchMove={this.touch}>
              <div className="vert-helper"></div>
              <img src={`build/img/icon-${i*2+1}.png`}/>
            </div>
            <div className="col"
                 onTouchStart={this.touch}
                 onTouchEnd={this.touch}
                 onTouchCancel={this.touch}
                 onTouchMove={this.touch}>
              <div className="vert-helper"></div>
              <img src={`build/img/icon-${i*2+2}.png`}/>
            </div>
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
        name: 'example app 3',
        logo: ''
      },{
        name: 'example app 4',
        logo: ''
      },{
        name: 'example app 5',
        logo: ''
      },{
        name: 'example app 6',
        logo: ''
      },{
        name: 'example app 7',
        logo: ''
      },{
        name: 'example app 8',
        logo: ''
      }
    ];
    return (<Minis minis={minis}/>);
  }
});

export default App;
