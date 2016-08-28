export const fadeIn = (domNode, removeDomNodeFunction, properties) => {
  domNode.style.opacity = 0;
  Velocity.animate(domNode, { opacity: 1 }, 300, "ease-out");
};

export const fadeOut = (domNode, removeDomNodeFunction, properties) => {
  domNode.style.opacity = 1;
  Velocity.animate(domNode, { opacity: 0 }, 300, "ease-out", removeDomNodeFunction);
};

export const slideIn = (domNode, removeDomNodeFunction, properties) => {
	console.log(domNode);
  Velocity.animate(domNode, { opacity: [0,1], marginTop: ['10%', 0] }, 300, "ease-out");
};