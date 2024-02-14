const { endConnection, connection } = require('../middlewares/connection');
const HttpError = require('../models/http-error');

const createBook = async (req, res, next) => {
    res.status(200).json({ message: 'created' });
};

const getBook = async (req, res, next) => {
    res.status(200).json({ books: [] });
};

const deleteBook = async (req, res, next) => {
    res.status(200).json({
        message: `Book with id ${req.params.id} deleted`,
    });
};

const updateBook = async (req, res, next) => {
    res.status(200).json({ message: `Book with id ${req.params.id} updated ` });
};

exports.createBook = createBook;
exports.getBook = getBook;
exports.deleteBook = deleteBook;
exports.updateBook = updateBook;
