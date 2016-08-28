import * as location from '../location';
import { h } from 'maquette';
import speech from '../speech';
import { BUTTON_STATES, VIEW_STATES, updateState } from '../wedux';
import Velocity from 'velocity-animate';

const fadeIn = function(domNode, removeDomNodeFunction, properties) {
  domNode.style.opacity = 0;
  Velocity.animate(domNode, { opacity: 1 }, 200, "ease-out");
};

const fadeOut = function(domNode, removeDomNodeFunction, properties) {
  domNode.style.opacity = 1;
  Velocity.animate(domNode, { opacity: 0 }, 200, "ease-out", removeDomNodeFunction);
};

const onmousedown = () => {
  updateState({ button: BUTTON_STATES.ACTIVE });
  speech.record(listenText => updateState({ view: VIEW_STATES.PREVIEW, listenText, isPendingRequest: false }));
};

const onmouseup = () => {
  speech.stopRecording();
  updateState({ button: BUTTON_STATES.INACTIVE, isPendingRequest: true });
  //updateState({ view: VIEW_STATES.PREVIEW, button: BUTTON_STATES.INACTIVE });
};

const render = (state) =>{
  const recordingScreen = h(
    'div.recording',
    { enterAnimation: fadeIn, exitAnimation: fadeOut },
    [
      h('div.recording__wrapper',
        [
          h('div.spinner', [
            h('div.double-bounce1'),
            h('div.double-bounce2')
          ]),
          h('p.recording__instruction', ["record your wisp"])
        ]
      )
    ]
   );
  const toggle = (state.button === BUTTON_STATES.ACTIVE) ? recordingScreen : h('div.recording');
  return [
    toggle,
    h('button#record_button.initial.ui-center-button', {
      onmousedown,
      onmouseup,
      ontouchstart: onmousedown,
      ontouchend: onmouseup
    })
  ]
};

export default render;
