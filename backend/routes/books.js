const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const multer = require("../middleware/multer-config.js");
const bookController = require("../controllers/books.js");

// Route POST pour créer un livre
router.post("/", auth, multer, bookController.createBook);

// Route PUT pour modifier un livre
router.put("/:id", auth, multer, bookController.updateBook);

// Route DELETE pour supprimer un livre
router.delete("/:id", auth, bookController.deleteBook);

// Route GET pour récupérer un livre spécifique
router.get("/:id", auth, bookController.getOneBook);

// Route GET pour récupérer tous les livres
router.get("/", auth, bookController.getAllBooks);

module.exports = router;
