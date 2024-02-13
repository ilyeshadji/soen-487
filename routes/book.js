const express = require("express");

const router = express.Router();
const bookController = require("../controllers/book");
const { startConnection } = require("../middlewares/connection");

// NO AUTH
router.post("/book", startConnection, bookController.createBook);
router.get("/book", startConnection, bookController.getBook);
router.delete("/book", startConnection, bookController.deleteBook);
router.put("/book", startConnection, bookController.updateBook);

module.exports = router;
