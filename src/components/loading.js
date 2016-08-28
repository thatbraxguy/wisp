import { h } from 'maquette';
import Velocity from 'velocity-animate';

const loadingFade = function(domNode, removeDomNodeFunction, properties) {
  domNode.style.opacity = 1;
  Velocity.animate(domNode, { opacity: 0 }, 500, "ease-out");
};

const render = () =>
  h('div#loading_overlay', { exitAnimation: loadingFade }, 
    [
      h('div.wrapper', [
        h('div.spinner', [
          h('div.dot1'),
          h('div.dot2')
        ])
      ])
    ]
  );

export default render;
