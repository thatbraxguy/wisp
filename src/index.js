import GoogleMapLoader from 'google-maps';
import config from './config';
import db from './db';
import wisps from './wispStore';

require('../styles/main.scss');

// init google maps
console.log(config);
GoogleMapLoader.KEY = config.gmaps.apiKey;
GoogleMapLoader.load(google => {
  new google.maps.Map(document.querySelector('#map'), config.gmaps.options);
});

// switch callback to instead create a node on the map!
wisps.addListener('child_added', data => console.log(data));
