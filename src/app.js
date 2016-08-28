import { h, createProjector } from 'maquette';
const projector = createProjector();

import recordButton from './components/recordButton';

const VIEW_STATES = {
  RECORDING: 'RECORDING',
  PREVIEW: 'PREVIEW',

};

const screenState = {
  view: VIEW_STATES.RECORDING, //
};

function render() {
  return h('div', [
    h('div#map'),
    h('div#UI', [
      recordButton()
    ])
  ]);
};

document.addEventListener('DOMContentLoaded', () =>
  projector.append(document.querySelector('#app'), render));
