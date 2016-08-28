import { h } from 'maquette';

import { VIEW_STATES, updateState } from '../wedux';
import speech from '../speech';
import { getPlayerLocation } from '../location';
import wispStore from '../wispStore';

let data = '';

const uploadRecord = () => {
  updateState({ isPendingRequest: false });

  return getPlayerLocation()
    .then(({ lat, lng }) => {
      wispStore.push({
        lat,
        lng,
        message: data,
      });
    })
    .then(() => updateState({ view: VIEW_STATES.DEFAULT, isPendingRequest: false }));
};

const cancelRecord = () => updateState({ view: VIEW_STATES.DEFAULT });
const playPreview = () => speech.speak(data);

const render = ({ listenText }) => {
  data = listenText;
  return [
    h('p.voice-text', [listenText]),
    h('div#preview_buttons', [
      h('button#cancel_record', { onclick: cancelRecord }),
      h('button#replay_record', { onclick: playPreview }),
      h('button#upload_record', { onclick: uploadRecord }),
    ]),
  ];
}

export default render;
