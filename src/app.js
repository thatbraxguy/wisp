import { h, createProjector } from 'maquette';
import cssTransitions from 'css-transition';
import { contains } from 'ramda';

import topBar from './components/topBar';
import recordButton from './components/recordButton';
import listening from './components/listening';
import loading from './components/loading';
import preview from './components/preview';
import * as wedux from './wedux';
const projector = createProjector();

// View resolver right?
const viewFunctions = {
  DEFAULT:  () => [topBar(wedux.state), recordButton(wedux.state)],
  LISTENING: () => [topBar(wedux.state), listening(wedux.state)],
  LOADING: () => loading(),
  PREVIEW: () => [topBar(wedux.state), preview(wedux.state)],
};

// #classnames is a good library
const shadedViews = [wedux.VIEW_STATES.LISTENING, wedux.VIEW_STATES.PREVIEW];
const uiClasses = ({ view }) => contains(view, shadedViews) ? '.ui-shade' : '';

// :P
const render = state => {
  const currentUI = viewFunctions[state.view]();
  if (state.isPendingRequest) {
    console.log('bae');
    currentUI.push(h('div.request-pending', [
      h('div.bounce1'),
      h('div.bounce2'),
      h('div.bounce3'),
    ]));
  }

  return h('div', [
    h('div#map'),
    h(`div#UI${uiClasses(state)}`, currentUI),
  ]);
}

document.addEventListener('DOMContentLoaded', () =>
  projector.append(document.querySelector('#app'), () => render(wedux.state), {transitions: cssTransitions}));

wedux.connect(() => projector.scheduleRender());
