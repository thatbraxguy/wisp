import db from './db';

let listeners = {};
let wisps = {};

const callListeners = (event, data) => {
  if (listeners[event]) {
    listeners[event].forEach(x => x(data));
  }
};

const addListener = (event, cb) => {
  listeners[event] = listeners[event] || [];
  listeners[event].push(cb);
}

const init = () => {
  wisps = db.ref('wisp');
  wisps.on('child_added', snapshot =>
    callListeners('child_added', snapshot.val()));
}

export default {
  init,
  addListener,
  push: data => wisps.push(data),
};
