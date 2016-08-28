import { h } from 'maquette';

import { VIEW_STATES, updateState } from '../wedux';
import speech from '../speech';

const onmouseup = () => {
  updateState({ view: VIEW_STATES.DEFAULT });
};

const render = ({ listenText, listenProgress }) => {
  speech.speak(listenText);
  return [
    h('p', [listenText]),
    h('button#close_button.ui-center-button', { onmouseup }, ['X']),
  ];
}


export default render;
