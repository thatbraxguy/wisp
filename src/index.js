import db from './db';
import wisps from './wispStore';

require('../styles/main.scss');

// init google maps

// switch callback to instead create a node on the map!
wisps.addListener('child_added', data => console.log(data));
