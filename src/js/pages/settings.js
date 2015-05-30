/**
 * Created by joe on 29/05/15.
 */
import React from 'react';
var App = React.createClass({
    render() {
        return (
            <div className="list">
                <div className="item item-divider">
                    Settings
                </div>
                <div className="item item-toggle toggle-large " checked="checked">
                    <div ng-transclude="">
                        <span className="ng-binding">
                            Wireless
                        </span>
                    </div>
                    <label className="toggle disable-user-behavior">
                        <input type="checkbox" className=" " checked="checked">                                 </input>
                        <div className="track">
                            <div className="handle"></div>
                        </div>

                    </label>
                </div>
                <div className="item item-toggle toggle-large " ng-repeat="item in settingsList" ng-model="item.checked" ng-checked="item.checked">
                    <div ng-transclude="">
                        <span className="ng-binding">
                            GPS
                        </span>
                    </div>
                    <label className="toggle disable-user-behavior">
                        <input type="checkbox" className=" ">                                 </input>

                        <div className="track">
                            <div className="handle"></div>
                        </div>
                    </label>
                </div>
                <div className="item item-toggle toggle-large " ng-repeat="item in settingsList" ng-model="item.checked" ng-checked="item.checked">
                    <div ng-transclude="">
                        <span className="ng-binding">
                            Bluetooth
                        </span>
                    </div>
                    <label className="toggle disable-user-behavior">
                        <input type="checkbox" ng-model="item.checked" ng-checked="item.checked" className=" ">                                 </input>

                        <div className="track">
                            <div className="handle"></div>
                        </div>
                    </label>
                </div>

                <div className="item">

                </div>

                <div className="item item-divider">
                    Notifications
                </div>

                <div className="item item-toggle toggle-large " ng-model="pushNotification.checked" ng-change="pushNotificationChange()">
                    <div ng-transclude="">
                        <span>
                            Push Notifications
                        </span>
                    </div>
                    <label className="toggle disable-user-behavior">
                        <input type="checkbox" ng-model="pushNotification.checked" ng-change="pushNotificationChange()" className=" ">
                        </input>
                        <div className="track">

                            <div className="handle"></div>
                        </div>
                    </label>
                </div>


                <div className="item item-toggle toggle-large " toggle-className="toggle-assertive" ng-model="emailNotification" ng-true-value="Subscribed" ng-false-value="Unubscribed">
                    <div ng-transclude="">
                        <span>
                            Newsletter
                        </span>
                    </div>
                    <label className="toggle toggle-assertive disable-user-behavior">
                        <input type="checkbox" ng-model="emailNotification" ng-true-value="Subscribed" ng-false-value="Unubscribed" className=" ">
                        </input>

                        <div className="track">
                            <div className="handle"></div>
                        </div>
                    </label>
                </div>

                <div className="item">
                    <pre ng-bind="emailNotification | json" className="ng-binding">"Subscribed"</pre>
                </div>

            </div>
        )
    }
});

export default App;