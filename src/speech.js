
const utterance = new SpeechSynthesisUtterance();
utterance.lang = "en";

const recorder = new webkitSpeechRecognition();
recorder.lang = 'en';

const record = cb => {
  recorder.onresult = e => {
    if (e.results.length > 0) {
      const result = event.results[event.results.length-1];

      if (result.isFinal) {
        console.log(result[0].transcript, 'final');
        cb(result[0].transcript);
      }
    }
  };

  recorder.start();
};

const stopRecording = () => {
  recorder.stop();
}

const abortRecording = () => {
  recorder.abort();
}

// text to voice
const speak = text => {
  utterance.text = text;
  speechSynthesis.speak(utterance);
};


export default {
  record,
  stopRecording,
  abortRecording,
  speak
}
