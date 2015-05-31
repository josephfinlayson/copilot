/**
 * Created by joe on 29/05/15.
 */
import React from 'react';
var App = React.createClass({
    render() {
        return (
        <div className="row">
        <div className="list">
            <p>
            Hi John, to edit your account, please call Allianz Global Services on +4971 2938 2818
            </p>
                <label className="item item-input item-stacked-label">
                <span className="input-label">First Name</span>
                <input type="text" value="John" />
            </label>
            <label className="item item-input item-stacked-label">
                <span className="input-label">Last Name</span>
                <input type="text" value="Suhr" />
            </label>
            <label className="item item-input item-stacked-label">
                <span className="input-label">Email</span>
                <input type="text" value="john@suhr.com" />
            </label>
        </div>
            </div>
        )
    }
});

export default App;