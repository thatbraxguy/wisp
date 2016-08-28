import { h } from 'maquette';
import speech from '../speech';
import * as location from '../location';
import wispStore from '../wispStore';

const onmousedown = () => {
  speech.record(data => {
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
  speech.stopRecording();
};

const render = state =>
  h('button#record_button.initial.ui-center-button', { onmousedown, onmouseup });

export default render;
