import GoogleMapLoader from 'google-maps';
import Promise from 'bluebird';
import { forEach } from 'ramda';

import config from './config';
import { VIEW_STATES, updateState } from './wedux';
import wispAsset from './assets/wisp.png';

let googleObj;
let map;
let geocoder;
let mapIcon;
let player;
let placeService;

const minZoom = 18;

export const getUserLocation = () =>
  new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation
        .getCurrentPosition(({ coords }) => resolve(coords));
    }
  });

export const getPlayerLocation = () => new Promise((resolve, reject) => {
  const pos = player.getPosition();
  resolve({ lat: pos.lat(), lng: pos.lng() });
});

const makePlayerMarker = (position) => {
  player = new googleObj.maps.Marker({
    position,
    map,
    draggable: true,
  })

  player.addListener('dragend', () => getPlayerLocation().then(findCurrentPlace));
};

export const setMapLocation = ({ maps }) =>
  getUserLocation()
    .then(({ latitude, longitude }) => {
      const center = new maps.LatLng(latitude, longitude);
      map.setCenter(center);
      makePlayerMarker(center);

      console.log(center);
      findCurrentPlace({ lat: center.lat(), lng: center.lng() });
    });

const findCurrentPlace = (({ lat, lng}) => {
  geocoder.geocode({ location:{ lat, lng } }, (res, status) => {
    if(status === 'OK'){
      let temp = { placeId: res[0]['place_id'] };
      placeService.getDetails(temp, handlePlaceResponse);
    }
  });
});

const handlePlaceResponse = (res, status) => {
  if(status === 'OK'){
    updateState({currentLocation: res.name});
  }else{
    console.log(status);
  }
}

export const createWispMarker = ({ lat, lng, message }) =>
    new googleObj.maps.Marker({
        position: { lat, lng },
        map,
        icon: mapIcon,
      })
    .addListener('click', () =>
      updateState({ listenText: message, view: VIEW_STATES.LISTENING,})
    );

export const init = config =>
  new Promise(resolve => {
    // init google maps
    GoogleMapLoader.KEY = config.apiKey;
    GoogleMapLoader.LIBRARIES = ['places'];
    GoogleMapLoader.load(google => {
      googleObj = google;
      mapIcon = {
        url: wispAsset,
        size: new google.maps.Size(45, 45),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0),
        scaledSize: new google.maps.Size(25, 25)
      };

      map = new googleObj.maps.Map(document.querySelector('#map'), config.options);
      geocoder = new googleObj.maps.Geocoder;
      placeService = new googleObj.maps.places.PlacesService(map);

      googleObj.maps.event.addListener(map, 'zoom_changed', () => {
        if(map.getZoom() < minZoom) map.setZoom(minZoom);
      });

      resolve(googleObj);
    });
  });
