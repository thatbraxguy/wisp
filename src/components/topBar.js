import { h } from 'maquette';
import * as location from '../location';
import wispStore from '../wispStore';

const clickeduseless = () =>{
  console.log("incomplete functions");
};

const render = state =>
    h('div#top_bar', [
      h('div#current_location', [
        h('p#current', 'CURRENT LOCATION'),
        h('p#address', state.currentLocation)
      ]),
    ]);

export default render;
