const config = require("../config.json").firebase;
const firebase = require("firebase/app");
require("firebase/firestore");

firebase.initializeApp(config);

const database = firebase.firestore();

module.exports = database;
