const express = require('express')
const router = express.Router();
const movieRouter = require('./movies');
const authRouter = require('./auth');
const checkLogin = require('../controllers/auth').middleware.checkLogin


router.use('/auth',authRouter);
router.use('/movies',checkLogin,movieRouter);



module.exports = router;
