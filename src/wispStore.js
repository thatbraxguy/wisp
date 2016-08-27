import db from './db';

let listeners = {};
const wisps = db.ref('wisp');

const callListeners = (event, data) => {
  if (listeners[event]) {
    listeners[event].forEach(x => x(data));
  }
};

const addListener = (event, cb) => {
  listeners[event] = listeners[event] || [];
  listeners[event].push(cb);
}

wisps.on('child_added', snapshot =>
  callListeners('child_added', snapshot.val()));

export default {
  addListener,
  push: data => wisps.push(data),
};
