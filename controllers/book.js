const { endConnection, connection } = require("../middlewares/connection");
const HttpError = require("../models/http-error");

const createBook = async (req, res, next) => {
  console.log(connection);
  try {
    throw new Error("yo");

    const [rows] = connection.query("SELECT * FROM books ");
  } catch (e) {
    return next(new HttpError("Something went wrong", 404));
  }
  res.send(200);
  endConnection();
};

const getBook = async (req, res, next) => {};

const deleteBook = async (req, res, next) => {};

const updateBook = async (req, res, next) => {};

exports.createBook = createBook;
exports.getBook = getBook;
exports.deleteBook = deleteBook;
exports.updateBook = updateBook;
