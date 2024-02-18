const express = require('express');

const router = express.Router();
const bookController = require('../controllers/book');

// NO AUTH
router.post('/book', bookController.createBook);
router.get('/book', bookController.getBook);
router.delete('/book/:id', bookController.deleteBook);
router.put('/book/:id', bookController.updateBook);

module.exports = router;
