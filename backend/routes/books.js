const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const multer = require("../middleware/multer-config.js");
const bookController = require("../controllers/books.js");

router.post("/", auth, multer, bookController.createBook);
router.post("/:id/rating", auth, bookController.rateBook);
router.put("/:id", auth, multer, bookController.updateBook);
router.delete("/:id", auth, bookController.deleteBook);
router.get("/bestrating", bookController.getBestRatedBooks);
router.get("/:id", bookController.getOneBook);
router.get("/", bookController.getAllBooks);

module.exports = router;
