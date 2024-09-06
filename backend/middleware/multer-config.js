const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// Définir les types MIME autorisés pour les images
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png"
};

// Utilisation de stockage en mémoire pour Multer afin de traiter l'image en mémoire
const storage = multer.memoryStorage();

// Middleware Multer pour gérer les fichiers téléchargés
const upload = multer({ storage }).single("image");

// Middleware pour optimiser les images téléchargées
const optimizeImage = (req, res, next) => {
  // Vérifier s'il y a un fichier à optimiser
  if (!req.file) {
    return next(); // Aucun fichier, passez au middleware suivant
  }

  // Déterminer l'extension de l'image à partir du type MIME
  const extension = MIME_TYPES[req.file.mimetype];
  const filename = req.file.originalname
    .split(" ")
    .join("_")
    .replace(/\.[^/.]+$/, "") + '_' + Date.now() + '.' + extension;
  const outputPath = path.join('images', filename);

  // Utiliser Sharp pour redimensionner et optimiser l'image
  sharp(req.file.buffer)
    .resize(800) // Redimensionner l'image à 800px de largeur
    .toFormat(extension)
    .jpeg({ quality: 80 }) // Compression JPEG avec une qualité de 80%
    .toFile(outputPath, (err) => {
      if (err) {
        // Gérer les erreurs lors de l'optimisation de l'image
        return res.status(500).json({ error: 'Error processing image' });
      }

      // Ajouter le chemin de l'image optimisée à l'objet de requête
      req.file.path = outputPath;
      req.file.filename = filename;
      next(); // Passer au middleware suivant
    });
};

// Exporter le middleware Multer et l'optimisation d'image
module.exports = [upload, optimizeImage];
