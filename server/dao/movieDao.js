const database = require("../config/firebase");
const _ = require("lodash");

const movieDao = {
  addMovie: async (movie) => {
    return await database.collection("movies").add(movie);
  },
  getMovie: async (id) => {
    const ref = database.collection("movies").doc(id);
    const snapshot = await ref.get();

    if (!snapshot.exists) return;

    return { id: snapshot.id, ...snapshot.data() };
  },
  updateMovie: async (movie) => {
    const ref = database.collection("movies").doc(movie.id);
    delete movie.id;

    await ref.update(movie);
  },
  deleteMovie: async (id) => {
    const ref = database.collection("movies").doc(id);

    await ref.delete();
  },
  getMoviesFromSingleUser: async (id) => {
    const ref = database.collection("movies");
    const snapshot = await ref.get();

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const movies = _.toArray(data);
    return movies.filter((movie) => movie.userId == id);
  },

  getMoviesFromAll: async () => {
    const ref = database.collection("movies");
    const snapshot = await ref.get();

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return _.toArray(data);
  },
};

module.exports = movieDao;
