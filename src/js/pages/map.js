/**
 * Created by joe on 29/05/15.
 */
import React from 'react';

// console.log('here');
// function initialize() {
// 	var mapProp = {
// 		center:new google.maps.LatLng(51.508742,-0.120850),
// 		zoom:5,
// 		mapTypeId:google.maps.MapTypeId.ROADMAP
// 	};
// 	var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
// 	console.log(map);
// }




var App = React.createClass({
		getInitialState() {
			return {
				lat: 51.508742,
				lon: -0.120850,
				mapZoom: 15,
			}
		},
		initializeGoogleMap() {
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
			this.initializeGoogleMap();
		}
});

export default App;