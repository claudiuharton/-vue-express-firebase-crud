const database = require('../config/firebase')
const _ = require('lodash');
const firebaseKeyGetter = require('../utils/firebaseKeyGetter')


const controller = {
    findAll: async (req, res) => {
        const id = req.session.id;
        const userKey = await firebaseKeyGetter.getUserKey(id);
        const snapshot = await database.ref(`users/${userKey}/movies`).once('value');
        const movies = _.toArray(snapshot.val())


        res.status(200).send(movies ? movies : [])
    },
    findById: async (req, res) => {
        const idUser = req.session.id;
        const userKey = await firebaseKeyGetter.getUserKey(idUser);
        const snapshot = await database.ref(`users/${userKey}/movies`).once('value')
        const movies = _.toArray(snapshot.val())

        const movie = movies.find(movie => Number(movie.id) === Number(req.params.id));
        res.status(200).send(movie ? movie : {})
    },
    create: async (req, res) => {
        const id = req.session.id;
        const userKey = await firebaseKeyGetter.getUserKey(id);
        const moviesRef = database.ref(`users/${userKey}/movies`)
        const snapshot = await database.ref(`users/${userKey}/movies`).once('value');
        const movies = _.toArray(snapshot.val())
        const newMovieRef = moviesRef.push();
        newMovieRef.set({
            id: movies.length + 1,
            description: req.body.description,
            rate: req.body.rate,
            title: req.body.title
        })
        res.status(200).send({message: "Movie added"});

    },
    edit: async (req, res) => {
        const idUser = req.session.id;
        const userKey = await firebaseKeyGetter.getUserKey(idUser);

        const movieKey = await firebaseKeyGetter.getMovieKey(userKey, req.params.id);

        const movieRef = database.ref(`users/${userKey}/movies/${movieKey}`)

        movieRef.set({
            id: req.params.id,
            description: req.body.description,
            rate: req.body.rate,
            title: req.body.title
        })

        res.status(200).send({message: "Movie edited"});
    },
    delete: async (req, res) => {
        const idUser = req.session.id;
        const userKey = await firebaseKeyGetter.getUserKey(idUser);

        const movieKey = await firebaseKeyGetter.getMovieKey(userKey, req.params.id);

        const movieRef = database.ref(`users/${userKey}/movies/${movieKey}`)

        movieRef.remove();

        res.status(200).send({message: "Movie deleted"});
    }
}

module.exports = controller;
