import GoogleMapLoader from 'google-maps';
import Promise from 'bluebird';
import { forEach } from 'ramda';

import config from './config';
import { VIEW_STATES, updateState } from './wedux';

let googleObj;
let map;
let geocoder;
let placeService;

const minZoom = 18;

export const getUserLocation = () =>
  new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation
        .getCurrentPosition(({ coords }) => resolve(coords));
    }
  });

export const setMapLocation = ({ maps }) =>
  getUserLocation()
    .then(({ latitude, longitude }) => {
      map.setCenter(new maps.LatLng(latitude, longitude));
      let temp = maps.LatLng(latitude, longitude);

      geocoder.geocode({'location':{lat: latitude, lng: longitude}}, (res, status) => {
        if(status === 'OK'){
          let temp = {placeId:res[0]['place_id']};
          console.log(res[0]);
          console.log(temp);
          placeService.getDetails(temp,handlePlaceResponse);
        }else{
          console.log(status);
          console.log({latitude, longitude});
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

const craftShortAdd = res => {
  let addArray = res.formatted_address.split(' ');
  return addArray.slice(0,addArray.length-2).join(' ');
}

export const createWispMarker = ({ lat, lng, message }) =>
    new googleObj.maps.Marker({
        position: { lat, lng },
        map,
      })
    .addListener('click', () => {
      updateState({ listenText: message, view: VIEW_STATES.LISTENING,});
      geocoder.geocode({'location':{lat, lng}}, (res, status) => {
        if(status === 'OK'){
          console.log(res[0].formatted_address);
          updateState({currentLocation: res[0].formatted_address});
          //document.querySelector('#current_location').innerHTML = res[0].formatted_address;
        }else{
          console.log(status);
        }
      });
    });

export const init = config =>
  new Promise(resolve => {
    // init google maps
    GoogleMapLoader.KEY = config.apiKey;
    GoogleMapLoader.LIBRARIES = ['places'];
    GoogleMapLoader.load(google => {
      googleObj = google;

      map = new googleObj.maps.Map(document.querySelector('#map'), config.options);
      geocoder = new googleObj.maps.Geocoder;
      console.log(map);
      placeService = new googleObj.maps.places.PlacesService(map);

      googleObj.maps.event.addListener(map, 'zoom_changed', () => {
        if(map.getZoom() < minZoom) map.setZoom(minZoom);
      });

      resolve(googleObj);
    });
  });
