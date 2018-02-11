const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

export function connect() {
  if (!firebase.apps.length) {
    var config = {
      apiKey: "AIzaSyAWOozwCcy-iqA_NR1ZE6Z4hXexXgwNrWs",
      authDomain: "ctfwriteups-dc19b.firebaseapp.com",
      databaseURL: "https://ctfwriteups-dc19b.firebaseio.com",
      projectId: "ctfwriteups-dc19b",
      storageBucket: "ctfwriteups-dc19b.appspot.com",
      messagingSenderId: "246400000913"
    };

    firebase.initializeApp(config);
  }
  return firebase;
}