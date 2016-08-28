import * as location from '../location';
import { h } from 'maquette';
import speech from '../speech';
import { BUTTON_STATES, VIEW_STATES, updateState } from '../wedux';
import Velocity from 'velocity-animate';
import { fadeIn, fadeOut } from '../animations';

const onmousedown = () => {
  updateState({ button: BUTTON_STATES.ACTIVE });
  speech.record(listenText => updateState({ view: VIEW_STATES.PREVIEW, listenText }));
};

const onmouseup = () => {
  speech.stopRecording();
  updateState({ button: BUTTON_STATES.INACTIVE });
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
