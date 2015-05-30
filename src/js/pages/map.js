/**
 * Created by joe on 29/05/15.
 */
import React from 'react';
import $ from 'jquery';

var App = React.createClass({

	getInitialState() {
		return {
			lat: null,
			lng: null,
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
		var self = this;
		console.log(this.state.crimeApiURL);
		var heatmapGradient = [
			'rgba(248,177,177,0)',
			'rgba(236,81,81,1)',
			'rgba(236,81,81,1)',
			'rgba(234,65,65,1)',
			'rgba(234,65,65,1)',
			'rgba(229,48,48,1)',
			'rgba(229,48,48,1)',
			'rgba(229,36,36,1)',
			'rgba(229,36,36,1)',
			'rgba(230,24,24,1)',
			'rgba(230,24,24,1)',
			'rgba(223,6,6,1)',
			'rgba(223,6,6,1)',
			'rgba(194,1,1,1)',
			'rgba(194,1,1,1)'
		];
		$.get(this.state.crimeApiURL, function(result) {
			if (this.isMounted()) {
				var mapProp = {
					center:new google.maps.LatLng(this.state.lat,this.state.lng),
					zoom: this.state.mapZoom,
					mapTypeId:google.maps.MapTypeId.ROADMAP
				};
				var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

				var loadingWindow = new google.maps.InfoWindow({
					content:"Hello World!"
				});
				loadingWindow.open(map);

				var list = [];
				// var iconImg = {
				// 	url: 'build/img/red-dot-xs.png',
				// 	size: new google.maps.Size(20, 20),
				// 	origin: new google.maps.Point(0,0),
				// 	anchor: new google.maps.Point(0, 32)
				// };
				result.forEach(function(item) {
					var lat = item.location.latitude;
					var lng = item.location.longitude;
					// var marker = new google.maps.Marker({
					// 	position: new google.maps.LatLng(lat, lng),
					// 	map: map,
					// 	icon: 'build/img/red-dot-xs.png'
					// 	// icon: iconImg,
					// 	// zIndex: 1000
					// });
					// console.log(lat, lng);
					list.push(new google.maps.LatLng(lat, lng));
				});
				var pointArray = new google.maps.MVCArray(list);
				// console.log(pointArray);
				var center = new google.maps.LatLng(self.state.lat,self.state.lng);
				var heatmap = new google.maps.visualization.HeatmapLayer({
					center: center,
					data: pointArray,
					radius: 15
				});
				self.setState({heatmap: heatmap});
				heatmap.setMap(map);
				heatmap.set('gradient', heatmapGradient);
				loadingWindow.close();

				google.maps.event.addListener(map, 'dragend', function() {
					// console.log('Center Changed');
					var c = map.getCenter();
					var newLat = c.lat();
					var newLng = c.lng();
					// console.log(newLat, newLng);
					var dist = self.getDistanceFromLatLonInKm(self.state.lat, self.state.lng, newLat, newLng);
					console.log(dist);
					if (dist > 0.5) {
						self.setState({
							lng: newLng,
							lat: newLat,
							crimeApiURL: self.state.crimeApiURL + '?lat=' + newLat + '&lng=' + newLng
						});
						heatmap.setMap(null);
						self.getCrimeMap();
					}
				});

				google.maps.event.addListener(map, 'zoom_changed', function() {
					var newZoom = map.getZoom();
					self.setState({
						mapZoom: newZoom
					});
					if (newZoom > 20) {
						heatmap.set('radius', 20);
					}
					else if (newZoom < 15 ) {
						heatmap.set('radius', 15);
					}
					else if (newZoom < 10) {
						heatmap.set('radius', 10);
					}
					else {
						heatmap.set('radius', 10);
					}
					// console.log('Zoom Changed:', newZoom);
				});

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
							<div id="googleMap"><div className="loading-txt">Loading...</div></div>
					</div>
			)
	},

	componentDidMount() {
		if (!this.lat || !this.lng) {
			this.getLocationAndMap();
		}
	},

	getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
	  var R = 6371; // Radius of the earth in km
	  var dLat = this.deg2rad(lat2-lat1);  // this.deg2rad below
	  var dLon = this.deg2rad(lon2-lon1);
	  var a =
	    Math.sin(dLat/2) * Math.sin(dLat/2) +
	    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
	    Math.sin(dLon/2) * Math.sin(dLon/2)
	    ;
	  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	  var d = R * c; // Distance in km
	  return d;
	},

	deg2rad(deg) {
	  return deg * (Math.PI/180)
	}

});

export default App;