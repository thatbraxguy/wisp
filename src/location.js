import GoogleMapLoader from 'google-maps';
import config from './config';
import { forEach } from 'ramda';

let map;
let googleObj;

// basement coords.json = { latitude: 37.787487600000006, longitude: -122.3965566 }
const tempSoundMarkers = [
  { lat: 37.787487600000006, lng: -122.3965566 },
  { lat: 37.78748760000003, lng: -122.39658 }
]

const setMapLocation = ({ maps }) => {
  if (navigator.geolocation) {
    navigator
      .geolocation
      .getCurrentPosition(
        ({ coords }) => map.setCenter(new maps.LatLng(coords.latitude, coords.longitude))
      );
  }
};

export const createWispMarkers = forEach(
  ({ lat, lng }) => new googleObj.maps.Marker({
      position: { lat, lng },
      map,
    })
);

// init google maps
GoogleMapLoader.KEY = config.gmaps.apiKey;
GoogleMapLoader.load(google => {
  googleObj = google;
  map = new google.maps.Map(document.querySelector('#map'), config.gmaps.options);
  setMapLocation(google);
  createWispMarkers(tempSoundMarkers);
});
