const mongoose = require('mongoose');
const fs = require('fs');
const Book = require('./models/Book'); // Assurez-vous que le chemin vers votre modèle est correct

// Connexion à MongoDB
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@grimoire.hgl1l.mongodb.net/grimoire?retryWrites=true&w=majority`)
  .then(() => {
    console.log('Connexion à MongoDB réussie !');

    // Lire le fichier JSON contenant les données
    const data = JSON.parse(fs.readFileSync('../frontend/public/data/data.json', 'utf-8'));

    // Insérer les données dans la collection Book
    Book.insertMany(data)
      .then(() => {
        console.log('Données importées avec succès !');
      })
      .catch((error) => {
        console.error('Erreur lors de l\'importation des données :', error);
      })
      .finally(() => {
        mongoose.connection.close(); // Fermer la connexion après l'opération
      });
  })
  .catch((error) => {
    console.error('Erreur de connexion à MongoDB :', error);
  });
