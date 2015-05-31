import React from 'react';
import _ from 'lodash';

import Router from 'react-router';

export default React.createClass({
  mixins: [Router.Navigation, Router.State],
  render() {
    const query = _.pairs(this.getQuery());

    return (
      <div className="list card">
      {query.map(pair => pair.map)}
      </div>
    );
  }
});
