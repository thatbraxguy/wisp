import { h, createProjector } from 'maquette';
const projector = createProjector();

import recordButton from './components/recordButton';
import listening from './components/listening';
import * as wedux from './wedux';

// View resolver right?
const views = {
  DEFAULT:  [recordButton()],
  LISTENING: listening(wedux.state),
}

// :P
const render = state =>
  h('div', [
    h('div#map'),
    h('div#UI', views[state.view]),
  ]);

document.addEventListener('DOMContentLoaded', () =>
  projector.append(document.querySelector('#app'), () => render(wedux.state)));

wedux.connect(() => projector.scheduleRender());
