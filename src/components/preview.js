import { h } from 'maquette';

import { VIEW_STATES, updateState } from '../wedux';
import speech from '../speech';
import { getUserLocation } from '../location';
import wispStore from '../wispStore';

let data = '';

const uploadRecord = () =>
  getUserLocation()
    .then(({ latitude, longitude }) => {
      wispStore.push({
        lat: latitude,
        lng: longitude,
        message: data,
      });
    })
    .then(() => updateState({ view: VIEW_STATES.DEFAULT }));

const cancelRecord = () => updateState({ view: VIEW_STATES.DEFAULT });
const playPreview = () => speech.speak(data);

const render = ({ listenText }) => {
  data = listenText;
  return [
    h('p.voice-text', [listenText]),
    h('div#preview_buttons', [
      h('button#cancel_record', { onclick: cancelRecord }, ['X']),
      h('button#upload_record', { onclick: uploadRecord }, ['^']),
      h('button#play_preview', { onclick: playPreview }, ['>']),
    ]),
  ];
}

export default render;
