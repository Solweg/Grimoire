const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js"); // Middleware d'authentification
const multer = require("../middleware/multer-config.js"); // Middleware de gestion des fichiers
const bookController = require("../controllers/books.js"); // Contrôleur des opérations liées aux livres

// Route pour créer un livre
router.post("/", auth, multer, bookController.createBook);

// Route pour noter un livre
router.post("/:id/rating", auth, bookController.rateBook);

// Route pour mettre à jour un livre
router.put("/:id", auth, multer, bookController.updateBook);

// Route pour supprimer un livre
router.delete("/:id", auth, bookController.deleteBook);

// Route pour récupérer les livres avec les meilleures notes
router.get("/bestrating", bookController.getBestRatedBooks);

// Route pour récupérer un livre spécifique
router.get("/:id", bookController.getOneBook);

// Route pour récupérer tous les livres
router.get("/", bookController.getAllBooks);

// Export du routeur pour utilisation dans l'application
module.exports = router;
