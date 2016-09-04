const firebase = require('firebase');

var config = {
  apiKey: "AIzaSyAKD6_DMNKnxmK2vLeXIJqJCjC6_R_Nw8k",
  authDomain: "budget-app-f46b3.firebaseapp.com",
  databaseURL: "https://budget-app-f46b3.firebaseio.com",
  storageBucket: "budget-app-f46b3.appspot.com",
};
firebase.initializeApp(config);

module.exports = firebase;
