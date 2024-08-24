const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/books");
const userRoutes = require("./routes/user");
const app = express();

mongoose
  .connect(
    "mongodb+srv://user00:test123@grimoire.hgl1l.mongodb.net/?retryWrites=true&w=majority&appName=Grimoire"
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

// Middleware pour gérer CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Middleware pour servir les fichiers statiques
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes pour les livres
app.use("/api/books", bookRoutes);

// Routes pour l'authentification
app.use("/api/auth", userRoutes);

module.exports = app;
