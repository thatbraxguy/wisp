import GoogleMapLoader from 'google-maps';
import config from './config';

let map;

const setMapLocation = ({ maps }) => {
  if (navigator.geolocation) {
    navigator
      .geolocation
      .getCurrentPosition(
        ({ coords }) => map.setCenter(new maps.LatLng(coords.latitude, coords.longitude))
      );
  }
}

// init google maps
GoogleMapLoader.KEY = config.gmaps.apiKey;
GoogleMapLoader.load(google => {
  map = new google.maps.Map(document.querySelector('#map'), config.gmaps.options);
  setMapLocation(google);
});
