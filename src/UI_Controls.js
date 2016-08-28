import speech from './speech';
import * as location from './location';
import wispStore from './wispStore';

export const setupUI = () => {
  const UI = document.getElementById('UI');
  const button = document.getElementById('MainBut');

  button.addEventListener('mousedown', () => {
    console.log("recording start");
    speech.record(data => {
      console.log(data);
      location.getUserLocation()
      .then(({ latitude, longitude }) => {
        wispStore.push({
          lat: latitude,
          lng: longitude,
          message: data,
        });
      })
    });
  });

  button.addEventListener('mouseup', () => {
    console.log("recording stop");
    speech.stopRecording();
  });


  UI.appendChild(button);
};

export default setupUI;
