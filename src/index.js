import config from './config';
import db from './db';
import wisps from './wispStore';
import * as location from './location';
import * as wedux from './wedux';
import './app';

require('../styles/main.scss');

location.init(config.gmaps)
.then(location.setMapLocation)
.then(() => {
  wedux.updateState({ view: wedux.VIEW_STATES.ONBOARDING });
  wisps.addListener('child_added', location.createWispMarker);
  wisps.init();
});
