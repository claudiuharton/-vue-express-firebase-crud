const express = require("express");
const router = express.Router();
const movieRouter = require("./movies");
const authRouter = require("./auth");
const checkLogin = require("../controllers/auth").middleware.checkLogin;
const moviesController = require("../controllers/movies");

router.use("/auth", authRouter);

router.get("/movies/all", moviesController.findAllFromEveryone);
router.get("/movies/:id", moviesController.findById);

router.use("/movies", checkLogin, movieRouter);

module.exports = router;
