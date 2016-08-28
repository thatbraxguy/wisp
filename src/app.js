import { h, createProjector } from 'maquette';
const projector = createProjector();

function render() {
  return h('button#MainBut');
}

document.addEventListener('DOMContentLoaded', () =>
  projector.append(document.querySelector('#UI'), render));
