/**
 * Created by joe on 29/05/15.
 */
import React from 'react';
import $ from 'jquery';

var App = React.createClass({

	getInitialState() {
		return {
			lat: 0,
			lng: 0,
			map: null,
			mapZoom: 14,
			crimeApiURL: 'http://data.police.uk/api/crimes-street/all-crime',
			crimeData: null
		}
	},

	getLocationAndMap() {
		var self = this;
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				self.setState({
					lng: position.coords.longitude,
					lat: position.coords.latitude,
					crimeApiURL: self.state.crimeApiURL + '?lat=' + position.coords.latitude + '&lng=' + position.coords.longitude
				});
				self.initializeGoogleMap();
				self.getCrimeData();
			});
		} else {
			console.log("Geolocation is not supported by this browser.");
		}
	},

	initializeGoogleMap() {
		console.log('Lng: ', this.state.lng);
		console.log('Lat: ', this.state.lat);
		console.log('URL: ', this.state.crimeApiURL);
		var mapProp = {
			center:new google.maps.LatLng(this.state.lat,this.state.lng),
			zoom: this.state.mapZoom,
			mapTypeId:google.maps.MapTypeId.ROADMAP
		};
		var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
		// this.setState('map', new google.maps.Map(document.getElementById("googleMap"),mapProp));
	},

	getCrimeData() {
		$.get(this.state.crimeApiURL, function(result) {
			if (this.isMounted()) {
				// this.setState({
				// 	crimeData: result
				// });
				// var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
				var mapProp = {
					center:new google.maps.LatLng(this.state.lat,this.state.lng),
					zoom: this.state.mapZoom,
					mapTypeId:google.maps.MapTypeId.ROADMAP
				};
				var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
				for (var i=0; i<500; i++) {
					if (result[i]) {
						var pos = result[i]['location'];
						var category = result[i]['category'];
						console.log(pos);
						console.log(category);
						var point = new google.maps.LatLng(pos.latitude,pos.longitude);
						var marker = new google.maps.Marker({
							position:point,
							map: map
						});
					}
				}
			}
		}.bind(this));
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