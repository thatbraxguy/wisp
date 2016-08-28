import { h } from 'maquette';

const render = () => 
   h(
   	'div.recording', [
   		h('div.recording__wrapper',
   			[h('p', ["record your wisp"])]
   		)
   	]
   );


export default render;
