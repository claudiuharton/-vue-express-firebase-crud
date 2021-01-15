const movieDao = require("../dao/movieDao");
const userDao = require("../dao/userDao");

const controller = {
  findAll: async (req, res) => {
    try {
      const id = req.session.id;
      const movies = await movieDao.getMoviesFromSingleUser(id);
      res.status(200).send(movies);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  findAllFromEveryone: async (req, res) => {
    try {
      const movies = await movieDao.getMoviesFromAll();
      const formattedMovies = await Promise.all(
        movies.map(async (item) => {
          const user = await userDao.getUser(item.userId);
          return { ...item, email: user.email };
        })
      );
      res.status(200).send(formattedMovies);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  findById: async (req, res) => {
    try {
      const id = req.params.id;
      const movie = await movieDao.getMovie(id);

      if (!movie) {
        res.status(404).send({ message: "Movie not found" });
      } else {
        const user = await userDao.getUser(movie.userId);
        res.status(200).send({ ...movie, email: user.email });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  create: async (req, res) => {
    try {
      const id = req.session.id;

      await movieDao.addMovie({
        userId: id,
        genre: req.body.genre,
        description: req.body.description,
        rate: req.body.rate,
        title: req.body.title,
      });

      res.status(200).send({ message: "Movie added" });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  edit: async (req, res) => {
    const data = {
      id: req.params.id,
      genre: req.body.genre,
      rate: req.body.rate,
      description: req.body.description,
      title: req.body.title,
    };

    const movie = await movieDao.getMovie(data.id);

    if (!movie) {
      res.status(404).send({ message: "Movie not found" });
    } else {
      await movieDao.updateMovie(data);
      res.status(200).send({ message: "Movie edited" });
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;
    const movie = await movieDao.getMovie(id);

    if (!movie) {
      res.status(404).send({ message: "Movie not found" });
    } else {
      await movieDao.deleteMovie(id);
      res.status(200).send({ message: "Movie deleted" });
    }
  },
};

module.exports = controller;
