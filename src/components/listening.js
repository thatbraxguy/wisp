import { h } from 'maquette';
import { VIEW_STATES, updateState } from '../wedux';

const onmouseup = () => {
  updateState({ view: VIEW_STATES.DEFAULT });
};

const render = ({ listenText, listenProgress }) =>
  [
    h('p', ['temporary text']),
    h('button#close_button.ui-center-button', { onmouseup }, ['X']),
  ];


export default render;
