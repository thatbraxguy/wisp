import GoogleMapLoader from 'google-maps';
import Promise from 'bluebird';
import { forEach } from 'ramda';

import config from './config';
import { VIEW_STATES, updateState } from './wedux';

let map;
let googleObj;

export const getUserLocation = () =>
  new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation
        .getCurrentPosition(({ coords }) => resolve(coords));
    }
  });

export const setMapLocation = ({ maps }) =>
  getUserLocation().then(({ latitude, longitude }) =>
    map.setCenter(new maps.LatLng(latitude, longitude))
  );

export const createWispMarker = ({ lat, lng, message }) =>
    new googleObj.maps.Marker({
        position: { lat, lng },
        map,
      })
    .addListener('click', () => updateState({
      listenText: message,
      view: VIEW_STATES.LISTENING,
    }));

export const init = config =>
  new Promise(resolve => {
    // init google maps
    GoogleMapLoader.KEY = config.apiKey;
    GoogleMapLoader.load(google => {
      googleObj = google;
      map = new googleObj.maps.Map(document.querySelector('#map'), config.options);
      resolve(googleObj);
    });
  });
