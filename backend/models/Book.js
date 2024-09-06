const mongoose = require('mongoose');

// Définition du schéma pour le modèle Book
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Titre du livre
  author: { type: String, required: true }, // Auteur du livre
  imageUrl: { type: String, required: true }, // URL de l'image du livre
  year: { type: Number, required: true }, // Année de publication
  genre: { type: String, required: true }, // Genre du livre
  ratings: [
    {
      userId: { type: String, required: true }, // ID de l'utilisateur qui a noté
      grade: { type: Number, required: true, min: 0, max: 5 } // Note donnée par l'utilisateur, entre 0 et 5
    }
  ],
  averageRating: { type: Number, default: 0 }, // Note moyenne des utilisateurs
  userId: { type: String, required: true } // ID de l'utilisateur qui a créé le livre
});

// Exporter le modèle Mongoose pour l'utiliser dans l'application
module.exports = mongoose.model('Book', bookSchema);
