const {
    getBooksJob,
    createBookJob,
    updateBookJob,
    deleteBookJob
} = require('../middlewares/connection');
const HttpError = require('../models/http-error');

const createBook = async (req, res, next) => {
    const {name, author, year} = req.body

    if (!name || !author || !year) {
        return next(new HttpError("Could not create book", 400))
    }

    const book = await createBookJob({name, author, year});

    if (!book) {
        return next(new HttpError("Could not create book", 500))
    }

    res.status(200).json({
        status: "success",
        message: 'created',
        data: {
            book
        }
    });
};

const getBook = async (req, res, next) => {
    const books = await getBooksJob();

    if (!books) {
        return next(new HttpError("Could not fetch books", 500))
    }

    res.status(200).json({
        status: "success",
        count: books.length,
        data: {
            books
        }
    });
};

const deleteBook = async (req, res, next) => {
    const id = req.param.id * 1;

    if (!id) {
        return next(new HttpError("Could not delete book", 400))
    }

    const success = await deleteBookJob(id);

    if (!success) {
        return next(new HttpError("Could not delete book", 500))
    }

    res.status(200).json({
        message: `Book with id ${req.params.id} deleted`,
    });


};

const updateBook = async (req, res, next) => {
    let id = req.params.id * 1;
    const {fieldName, newValue} = req.body;

    if (!id || !fieldName || !newValue) {
        return next(new HttpError("Could not update book", 400))
    }

    const bookUpdated = await updateBook(fieldName, newValue, id)

    if (!bookUpdated) {
        return next(new HttpError("Could not update book", 500))
    }

    res.status(200).json({message: `Book with id ${req.params.id} updated `});
};

exports.createBook = createBook;
exports.getBook = getBook;
exports.deleteBook = deleteBook;
exports.updateBook = updateBook;
