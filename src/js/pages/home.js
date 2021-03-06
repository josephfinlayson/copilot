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
    return ~activated.indexOf(name);
};

var Minis = React.createClass({
    mixins: [Router.Navigation],
    handleClick(mini) {
        const activated = JSON.parse(localStorage.getItem('activated-mini-apps')) || [];
        if (isActivated(mini.name)) {
            this.transitionTo(mini.route);
        } else {
            activated.push(mini.name);
            localStorage.setItem('activated-mini-apps', JSON.stringify(activated));
            document.querySelector('.' + _.kebabCase(mini.name)).classList.add('activated');
        }
    },
    _touch: {
        // started
    },
    touch(event, mini) {
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
                    JSON.stringify(_.without(activated(), mini.name))
                );
                document.querySelector('.' + _.kebabCase(mini.name)).classList.remove('activated');
            } else if (duration > 0) {
                return this.handleClick(mini);
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
          const handle = event => this.touch(event, mini);
          const divStyle = {
              backgroundImage: `url(build/img/${mini.logo}.svg)`
          };

          return (
              <div className="card minis"
                  onTouchStart={handle}
                  onTouchEnd={handle}
                  onTouchCancel={handle}
                  onTouchMove={handle}
                  key={i}>
                  <div className={
                  "item item-image" +
                  (shouldBeActivated ? " activated" : "") +
                  " " + _.kebabCase(mini.name)
                      } style={divStyle}>
                      <h3>{mini.name}</h3>
                      <p>{mini.description}</p>
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
                description: 'Travel safely through an unknown environment',
                logo: 'icon-1',
                route: 'crimeMapper'
            }, {
                name: 'Guardian',
                description: "Call a guardian if you're feeling unsafe",
                logo: 'icon-2',
                route: 'guardian'
            },
             {
                name: 'Health Emergency',
                description: 'Get assistance fast',
                logo: 'health_emergency',
                route: 'health'
            }, {
                name: 'WithYou',
                description: "Audio directions so you look like you know where you're going",
                route: ''
            }, {
                name: 'Make Your Meeting',
                description: "Audio directions so you look like you know where you're going",
                route: ''
            },
            {
                name: 'WIFInder',
                description: "Find the connectivity you need",
                route: ''
            },
            {
                name: 'example app 7',
                logo: '',
                route: ''
            }, {
                name: 'example app 8',
                logo: '',
                route: ''
            }
        ];
        return (<Minis minis={minis}/>);
    }
});

export default App;
