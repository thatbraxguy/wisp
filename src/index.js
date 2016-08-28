import config from './config';
import db from './db';
import wisps from './wispStore';
import * as location from './location';
// import speech from './speech';
import './app';

require('../styles/main.scss');

// speech.record(x => speech.speak(x));

location.init(config.gmaps)
.then(location.setMapLocation)
.then(() => {
  wisps.addListener('child_added', location.createWispMarker);
  wisps.init();
});
