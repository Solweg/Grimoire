const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const multer = require("../middleware/multer-config.js");
const bookController = require("../controllers/books.js");

// Route POST pour créer un livre
router.post("/", auth, multer, bookController.createBook);

// Route POST pour la notation des livres
router.post("/:id/rating", auth, bookController.rateBook);

// Route PUT pour modifier un livre
router.put("/:id", auth, multer, bookController.updateBook);

// Route DELETE pour supprimer un livre
router.delete("/:id", auth, bookController.deleteBook);

// Route GET pour récupérer un livre spécifique
router.get("/:id", bookController.getOneBook);

// Route GET pour récupérer tous les livres
router.get("/", bookController.getAllBooks);

module.exports = router;
