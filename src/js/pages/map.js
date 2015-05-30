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
			mapZoom: 17,
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
				// self.initializeGoogleMap();
				self.getCrimeMap();
			});
		} else {
			console.log("Geolocation is not supported by this browser.");
		}
	},

	getCrimeMap() {
		$.get(this.state.crimeApiURL, function(result) {
			if (this.isMounted()) {
				var mapProp = {
					center:new google.maps.LatLng(this.state.lat,this.state.lng),
					zoom: this.state.mapZoom,
					mapTypeId:google.maps.MapTypeId.ROADMAP
				};
				var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
				// var list = [];
				var iconImg = {
					url: 'build/img/red-dot-hi.png',
					size: new google.maps.Size(20, 20),
				}
				result.forEach(function(item) {
					var lat = item.location.latitude;
					var lon = item.location.longitude;
					var marker = new google.maps.Marker({
						position: new google.maps.LatLng(lat, lon),
						map: map,
						icon: iconImg
					});
					// console.log(lat, lon);
					// list.push(new google.maps.LatLng(lat, lon));
				});
				// var pointArray = new google.maps.MVCArray(list);
				// console.log(pointArray);
				// var heatmap = new google.maps.visualization.HeatmapLayer({
				// 	data: pointArray
				// });
				// heatmap.setMap(map);
				// for (var i=0; i<500; i++) {
				// 	if (result[i]) {
				// 		var pos = result[i]['location'];
				// 		var category = result[i]['category'];
				// 		console.log(pos);
				// 		console.log(category);
				// 		var point = new google.maps.LatLng(pos.latitude,pos.longitude);
				// 		var marker = new google.maps.Marker({
				// 			position:point,
				// 			map: map
				// 		});
				// 	}
				// }
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