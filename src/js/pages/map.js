/**
 * Created by joe on 29/05/15.
 */
import React from 'react';
import $ from 'jquery';
import _ from 'lodash';

var App = React.createClass({

	getInitialState() {
		return {
			lat: null,
			lng: null,
			deviceLat: null,
			deviceLng: null,
			map: null,
			mapZoom: 15,
			heatmapRadius: 15,
			crimeApiURLRoot: 'http://data.police.uk/api/crimes-street/all-crime',
			crimeData: null,
			mapDragListener: false,
			mapZoomListener: false
		}
	},

	getLocationAndMap() {
		var self = this;
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				self.setState({
					lng: position.coords.longitude,
					lat: position.coords.latitude,
					deviceLng: position.coords.longitude,
					deviceLat: position.coords.latitude
				});
				console.log('Got my location: ', position.coords.longitude, ', ', position.coords.latitude );
				self.getCrimeMap();
			});
		} else {
			console.log('Geolocation is not supported by this browser');
			alert("Sorry, Geolocation is not supported by this browser.");
		}
	},

	getCrimeMap() {
		var self = this;
		// console.log(this.state.crimeApiURLRoot);
		var heatmapGradient = [
			'rgba(248,177,177,0)',
			'rgba(248,177,177,0)',
			// 'rgba(236,81,81,1)',
			// 'rgba(234,65,65,1)',
			'rgba(248,177,177,0)',
			'rgba(248,177,177,0)',
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
		// console.log('calling api...');
		var ApiURL = self.state.crimeApiURLRoot + '?lat=' + self.state.lat + '&lng=' + self.state.lng;
		// console.log(ApiURL);
		$('.map-overlay').show();
		$.get(ApiURL, function(result) {
			// console.log('done calling api');
			$('.map-overlay').hide();
			if (this.isMounted()) {
				var map;
				if (!self.state.map) {
					var mapProp = {
						center:new google.maps.LatLng(this.state.lat,this.state.lng),
						zoom: this.state.mapZoom,
						mapTypeId:google.maps.MapTypeId.ROADMAP
					};
					map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
					self.setState({
						map: map
					});

					var devicePosition = new google.maps.LatLng(self.state.deviceLat, self.state.deviceLng);
					var marker=new google.maps.Marker({
						position: devicePosition,
					});
					marker.setMap(map);

				}
				else {
					map = self.state.map;
				}

				var list = [];

				result.forEach(function(item) {
					var lat = item.location.latitude;
					var lng = item.location.longitude;
					list.push(new google.maps.LatLng(lat, lng));
				});
				var pointArray = new google.maps.MVCArray(list);
				var center = new google.maps.LatLng(self.state.lat,self.state.lng);
				if (self.state.heatmap) {
					// console.log('removing old heatmap.');
					self.state.heatmap.setMap(null);
				}
				var heatmap = new google.maps.visualization.HeatmapLayer({
					center: center,
					data: pointArray,
					radius: self.state.heatmapRadius
				});
				// console.log('drawing new heatmap: ');
				self.setState({heatmap: heatmap});
				heatmap.setMap(map);
				heatmap.set('gradient', heatmapGradient);

				var debouncedCrimeMap = _.debounce(self.getCrimeMap, 500);

				if (!self.state.mapDragListener) {
					self.setState({
						mapDragListener:true
					});
					google.maps.event.addListener(self.state.map, 'dragend', function() {
						// console.log('Center Changed');
						var map = self.state.map;
						var c = map.getCenter();
						var newLat = c.lat();
						var newLng = c.lng();
						// console.log(newLat, newLng);
						var dist = self.getDistanceFromLatLonInKm(self.state.lat, self.state.lng, newLat, newLng);
						// console.log(dist);
						if (dist > 0.5) {

							// var currentPosition = new google.maps.LatLng(newLat, newLng);
							// var marker=new google.maps.Marker({
							// 	position: currentPosition,
							// });
							// marker.setMap(map);

							self.setState({
								lng: newLng,
								lat: newLat
							});
							debouncedCrimeMap();
						}
					});
				}

				if (!self.state.mapZoomListener) {
					self.setState({
						mapZoomListener:true
					});
					google.maps.event.addListener(self.state.map, 'zoom_changed', function() {
						var map = self.state.map;
						var newZoom = map.getZoom();
						// console.log('zoom: ', newZoom);
						self.setState({
							mapZoom: newZoom
						});
						heatmap.set('radius', parseInt(newZoom * 1));
						// if (newZoom > 20) {
						// 	heatmap.set('radius', 20);
						// }
						// else if (newZoom <= 15 ) {
						// 	heatmap.set('radius', 15);
						// }
						// else if (newZoom <= 10) {
						// 	heatmap.set('radius', 10);
						// }
						// else {
						// 	heatmap.set('radius', 5);
						// }
						// console.log('Zoom Changed:', newZoom);
					});
				}
			}
		}.bind(this));
	},

	render() {
		var width = parseInt ($(window).width()) - 40;
		var height = '500';
		var mapStyle = {
			width: width,
			height: height
		};
		return (
			<div className="map-wrapper">
				<div className="map-overlay">
					<div className="loading-txt">Loading...</div>
				</div>
				<div id="googleMap" style={mapStyle}></div>
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