/**
 * Created by joe on 29/05/15.
 */
import React from 'react';

var Minis = React.createClass({
  render() {
    const minis = this.props.minis;
    return (
      <div>
        {minis.map((mini, i) => (<div key={i} className="mini">{mini.name}</div>))}
      </div>
    );
  }
});

var App = React.createClass({
  render() {
    const minis = [
      {name: 'SOS'},
      {name: 'CrimeMapper'},
      {name: 'example app'},
      {name: 'example app'},
      {name: 'example app'},
      {name: 'example app'},
      {name: 'example app'},
      {name: 'example app'}
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
