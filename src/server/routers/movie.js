const express = require('express');
const {
    getAllMovies,
    createMovie,
    deleteMovie,
} = require('../controllers/movie');

const router = express.Router();

router.get('/', getAllMovies);
router.post('/', createMovie);
router.delete('/:id', deleteMovie);

module.exports = router;