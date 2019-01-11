const firebase = require('firebase');
const config = require('../config').firebase


firebase.initializeApp(config);

module.exports = firebase.database();
