const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Définition du schéma pour le modèle User
const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, // L'email doit être unique
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Validation du format d'email
  },
  password: { 
    type: String, 
    required: true // Le mot de passe est obligatoire
  }
});

// Plugin pour s'assurer que l'email est unique dans la base de données
userSchema.plugin(uniqueValidator);

// Exporter le modèle Mongoose pour l'utiliser dans l'application
module.exports = mongoose.model("User", userSchema);
