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
  h('div#slide1.slide', [
    h('div.slide__wrapper', [
      h('h1.logo', 'WISP'),
      h('p', 'Leaving memories for you to rediscover again.')
    ])
  ]),
  h('div#slide2.slide', [
    h('div.slide__wrapper', [
      h('h3', 'Leaving Wisps'),
      h('button#record_button.initial.ui-center-button'),
      h('p', 'While presing on the record button, speak and leave your message.')
    ])
  ]),
  h('div#slide2.slide', [
    h('div.slide__wrapper', [
      h('h3', 'Viewing Wisps'),
      h('img', { src: viewingWispsAsset }),
      h('p', 'Listen to other wisps people have left by pressing on them.')
    ])
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
    h('button#continueBtn.pointerEvents.carousel-btn', { onclick: skip }, ["Continue"]),
    h('section.bottom-actions', [
      h('button#prevBtn.pointerEvents.carousel-btn', { onclick: lastSlide }),
      h('button#nextBtn.pointerEvents.carousel-btn', { onclick: nextSlide })
    ]),
    h('div.carousel.pointerEvents', [getSlides()]),
  ]);
}

export default render;
