import { h } from 'maquette';

import { VIEW_STATES, updateState } from '../wedux';
import speech from '../speech';

const onmouseup = () => {
  updateState({ view: VIEW_STATES.DEFAULT });
};

const render = ({ listenText, datetime, listenProgress }) => {
  speech.speak(listenText);
  console.log('datetime', datetime);
  return [
    h('div#message', [
      h('p.voice-text', [listenText]),
      h('p.wisp-date', datetime),
    ]),
    h('button#close_button.ui-center-button', { onmouseup }),
  ];
}


export default render;
