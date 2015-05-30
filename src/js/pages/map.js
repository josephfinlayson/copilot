/**
 * Created by joe on 29/05/15.
 */
import React from 'react';

var App = React.createClass({

	getInitialState() {
		return {
			lat: 0,
			lon: 0,
			mapZoom: 15,
		}
	},

	getLocationAndMap() {
		var self = this;
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				self.setState({
					lon: position.coords.longitude,
					lat: position.coords.latitude
				});
				self.initializeGoogleMap();
			});
		} else {
			console.log("Geolocation is not supported by this browser.");
		}
	},

	initializeGoogleMap() {
		console.log(this.state.lon);
		var mapProp = {
			center:new google.maps.LatLng(this.state.lat,this.state.lon),
			zoom: this.state.mapZoom,
			mapTypeId:google.maps.MapTypeId.ROADMAP
		};
		var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
	},

	render() {
			return (
					<div>
							<h1>map</h1>
							<div id="googleMap"></div>
					</div>
			)
	},

	componentDidMount() {
		this.getLocationAndMap();
	}
});

export default App;