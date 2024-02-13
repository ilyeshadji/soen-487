const { endConnection } = require("../middlewares/connection");
const createBook = async (req, res, next) => {
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
