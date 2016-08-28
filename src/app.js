import { h, createProjector } from 'maquette';
import { contains } from 'ramda';

import topBar from './components/topBar';
import recordButton from './components/recordButton';
import listening from './components/listening';
import * as wedux from './wedux';
const projector = createProjector();

// View resolver right?
const viewFunctions = {
  DEFAULT:  () => [topBar(wedux.state), recordButton()],
  LISTENING: () => listening(wedux.state),
}

// #classnames is a good library
const shadedViews = [wedux.VIEW_STATES.LISTENING];
const uiClasses = ({ view }) => contains(view, shadedViews) ? '.ui-shade' : '';

// :P
const render = state =>
  h('div', [
    h('div#map'),
    h(`div#UI${uiClasses(state)}`, viewFunctions[state.view]()),
  ]);

document.addEventListener('DOMContentLoaded', () =>
  projector.append(document.querySelector('#app'), () => render(wedux.state)));

wedux.connect(() => projector.scheduleRender());
