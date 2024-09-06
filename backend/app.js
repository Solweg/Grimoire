const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors"); // Import du package cors
const bookRoutes = require("./routes/books");
const userRoutes = require("./routes/user");
require("dotenv").config(); // Chargement des variables d'environnement

const app = express();

// Connexion à MongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@grimoire.hgl1l.mongodb.net/grimoire?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.error("Connexion à MongoDB échouée :", error));

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Middleware pour gérer CORS
app.use(cors()); // Utilisation de CORS pour permettre les requêtes Cross-Origin

// Middleware pour servir les fichiers statiques
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes pour les livres
app.use("/api/books", bookRoutes);

// Routes pour l'authentification
app.use("/api/auth", userRoutes);

module.exports = app;
