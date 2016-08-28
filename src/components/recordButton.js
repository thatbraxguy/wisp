import { h } from 'maquette';
import speech from '../speech';
import * as location from '../location';
import wispStore from '../wispStore';

const onmousedown = () => {
  console.log("recording start");
  speech.record(data => {
    console.log(data);
    location.getUserLocation()
    .then(({ latitude, longitude }) => {
      wispStore.push({
        lat: latitude,
        lng: longitude,
        message: data,
      });
    });
  });
};

const onmouseup = () => {
  console.log("recording stop");
  speech.stopRecording();
};

const render = state =>
  h('button#MainBut', { onmousedown, onmouseup });

export default render;
