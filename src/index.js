import config from './config';
import db from './db';
import wisps from './wispStore';
import location from './location';

require('../styles/main.scss');

console.log(config);

// switch callback to instead create a node on the map!
wisps.addListener('child_added', data => console.log(data));
