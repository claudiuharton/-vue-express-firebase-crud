const database = require('../config/firebase')
const _ = require('lodash');

const firebaseKeyGetter = {
    getUserKey : async (id) => {
        const snapshot = await database.ref('users').once('value');
        const users = _.toArray(snapshot.val())
        const user = users.find(user => Number(user.id) === Number(id));
        const userIndex = users.indexOf(user);
        const userKeys = Object.keys(snapshot.val());
        return userKeys[userIndex]
    },

    getMovieKey : async (userKey, idMovie) => {
        const snapshot = await database.ref(`users/${userKey}/movies`).once('value')
        const movies = _.toArray(snapshot.val())

        const movie = movies.find(movie => Number(movie.id) === Number(idMovie));
        const movieIndex = movies.indexOf(movie);

        const movieKeys = Object.keys(snapshot.val());


        return movieKeys[movieIndex]
    }
}

module.exports = firebaseKeyGetter
