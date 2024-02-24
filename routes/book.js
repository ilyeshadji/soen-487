const express = require('express');

const router = express.Router();
const bookController = require('../controllers/book');

// NO AUTH
//router.post('/book', bookController.createBook);
//router.get('/book', bookController.getBook);
router.delete('/book/:id', bookController.deleteBook);
router.patch('/book/:id', bookController.updateBook);

//re-organize the routes
router
    .route('/book')
    .get(bookController.getBook)
    .post(bookController.createBook);

module.exports = router;
