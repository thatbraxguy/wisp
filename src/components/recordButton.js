import { h } from 'maquette';
import speech from '../speech';
import { VIEW_STATES, updateState } from '../wedux';

const onmousedown = () =>
  speech.record(listenText => updateState({ view: VIEW_STATES.PREVIEW, listenText }));

const onmouseup = () => {
  speech.stopRecording();
};

const render = state =>
  h('button#record_button.initial.ui-center-button',
    {
      onmousedown,
      onmouseup,
      ontouchstart: onmousedown,
      ontouchend: onmouseup
    });

export default render;
