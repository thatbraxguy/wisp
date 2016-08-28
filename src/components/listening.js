import { h } from 'maquette';

import { VIEW_STATES, updateState } from '../wedux';
import speech from '../speech';

const onmouseup = () => {
  updateState({ view: VIEW_STATES.DEFAULT });
};

const render = ({ listenText, listenProgress }) => {
  speech.speak(listenText);
  return [
    h('p.voice-text', [listenText]),
    h('button#close_button.ui-center-button', { onmouseup }),
  ];
}


export default render;
