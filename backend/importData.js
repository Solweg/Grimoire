const mongoose = require('mongoose');
const fs = require('fs');
const Book = require('./models/Book'); // Assurez-vous que le chemin vers votre modèle est correct

// Connexion à MongoDB
mongoose.connect('mongodb+srv://user00:test123@grimoire.hgl1l.mongodb.net/Grimoire', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connexion à MongoDB réussie !');

  // Lire le fichier JSON
  const data = JSON.parse(fs.readFileSync('../frontend/public/data/data.json', 'utf-8'));

  // Insérer les données dans la collection
  Book.insertMany(data)
    .then(() => {
      console.log('Données importées avec succès !');
      mongoose.connection.close();
    })
    .catch((error) => {
      console.error('Erreur lors de l\'importation des données :', error);
      mongoose.connection.close();
    });
})
.catch((error) => {
  console.error('Erreur de connexion à MongoDB :', error);
});
