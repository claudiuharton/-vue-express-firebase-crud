
const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies')

router.get('/', moviesController.findAll);
router.post('/', moviesController.create);
router.get('/:id', moviesController.findById);
router.put('/:id', moviesController.edit);
router.delete('/:id', moviesController.delete);




module.exports = router;
