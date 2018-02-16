const firebase = require("firebase");
const credentials = require('./firebase.json');
// Required for side-effects
require("firebase/firestore");

export function connect() {
  if (!firebase.apps.length) {
    var config = credentials;

    firebase.initializeApp(config);
  }
  return firebase;
}