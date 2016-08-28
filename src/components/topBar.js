import { h } from 'maquette';
import * as location from '../location';
import wispStore from '../wispStore';

const clickeduseless = () =>{
  console.log("incomplete functions");
};

const render = state =>
    h('div#top_bar', [
      h('button#side_menu', {clickeduseless}),
      h('div#current_location', [
        h('p#current', 'currentLocation'),
        h('p#address', state.currentLocation)
      ]),
      h('button#compass', {onmousedown})
    ]);

export default render;
