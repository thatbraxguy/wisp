import { h } from 'maquette';
import { VIEW_STATES, updateState } from '../wedux';

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
  'slide 1',
  'slide 2',
  'slide 3',
];

const getSlides = () =>
  slides.map((slide, i) => {
    let classnames = 'img.carousel--item';

    if (i === currSlide) {
      classnames += '.active';
      classnames += forward ? '.forward' : '.backward';
    }

    return h(classnames, slide);
  });

const render = () => {
  return [
    h('button#continueBtn.pointerEvents', { onclick: skip }),
    h('button#nextBtn.pointerEvents', { onclick: nextSlide }),
    h('button#prevBtn.pointerEvents', { onclick: lastSlide }),
    h('div.carousel.pointerEvents', [getSlides()]),
  ];
}

export default render;
