import config from './config';
import db from './db';
import wisps from './wispStore';
import * as location from './location';

require('../styles/main.scss');

console.log(config);

// basement coords.json = { latitude: 37.787487600000006, longitude: -122.3965566 }
const tempSoundMarkers = [
  { lat: 37.787487600000006, lng: -122.3965566, message: 'Everything was beautiful' },
  { lat: 37.78748760000003, lng: -122.39658, message: 'And Nothing Hurt' }
];
location.init(config.gmaps)
  .then(location.setMapLocation)
  .then(() => location.createWispMarkers(tempSoundMarkers));


// switch callback to instead create a node on the map!
wisps.addListener('child_added', data => console.log(data));
