import { h } from 'maquette';
import { VIEW_STATES, updateState } from '../wedux';
import viewingWispsAsset from '../assets/onboard-wisp.png';

let currSlide = 0;
let forward = true;
const numSlides = 3;

const nextSlide = () => {
  if(currSlide < numSlides -1){
    currSlide++;
    forward = true;
  }
};

const lastSlide = () => {
  if (currSlide != 0) {
    currSlide--;
    forward = false;
  }
};

const skip = () => {
  updateState({ view: VIEW_STATES.DEFAULT });
};

const slides = [
  h('div#slide1', [
    h('h1', 'WISP')
  ]),
  h('div#slide2', [
    h('button#record_button.initial.ui-center-button')
  ]),
  h('div#slide3', [
    h('h3', 'Viewing Wisps'),
    h('img', { src: viewingWispsAsset })
  ]),
];

const getSlides = () =>
  slides.map((slide, i) => {
    let classnames = 'div.carousel--item';
    classnames += `#slide${i}`

    if (i === currSlide) {
      classnames += '.active';
      classnames += forward ? '.forward' : '.backward';
    }

    return h(classnames, slide);
  });

const render = () => {
  return h('div.onboarding', [
    h('button#continueBtn.pointerEvents', { onclick: skip }),
    h('button#nextBtn.pointerEvents', { onclick: nextSlide }),
    h('button#prevBtn.pointerEvents', { onclick: lastSlide }),
    h('div.carousel.pointerEvents', [getSlides()]),
  ]);
}

export default render;
