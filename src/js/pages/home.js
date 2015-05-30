/**
 * Created by joe on 29/05/15.
 */

import React from 'react';
import _ from 'lodash';

var Minis = React.createClass({
  tap(event) {
    const el = event.target;
    console.log(`tapped ${el.textContent}`);
    if (confirm(`Do you want to activate ${el.textContent}?`)) {
      console.log('YES');
    }
  },
  render() {
    const minis = this.props.minis;
    return (
      <div>
        {_.chunk(minis, 2).map((minis2, i) => (
          <div key={i} className="row">
            <div className="col" onClick={this.tap}>{minis2[0].name}</div>
            <div className="col" onClick={this.tap}>{minis2[1].name}</div>
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
