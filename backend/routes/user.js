const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user"); // Contrôleur pour la gestion des utilisateurs

// Route pour l'inscription d'un utilisateur
router.post("/signup", userCtrl.signup);

// Route pour la connexion d'un utilisateur
router.post("/login", userCtrl.login);

// Export du routeur pour utilisation dans l'application
module.exports = router;
