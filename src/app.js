import { h, createProjector } from 'maquette';
const projector = createProjector();

import recordButton from './components/recordButton';

// some sweet state
// expose that sultry state
export const VIEW_STATES = {
  RECORDING: 'RECORDING',
  PREVIEW: 'PREVIEW',
  LISTENING: 'LISTENING',
  MENU: 'MENU',
  SETTINGS: 'SETTINGS',
  DEFAULT: 'DEFAULT',
};

const getInitialSate = () => ({
  view: VIEW_STATES.DEFAULT,
});
export const state = getInitialSate();

// View resolver right?
const views = {
  DEFAULT:  [recordButton()],
}

// :P
const render = () =>
  h('div', [
    h('div#map'),
    h('div#UI', views[state.view]),
  ]);

document.addEventListener('DOMContentLoaded', () =>
  projector.append(document.querySelector('#app'), render));
