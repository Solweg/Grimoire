const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Extraction du token de la requête d'en-tête
    const token = req.headers.authorization.split(" ")[1];

    // Vérification du token avec la clé secrète
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Ajout de l'ID utilisateur décodé à l'objet de requête
    req.auth = {
      userId: decodedToken.userId
    };

    // Passer au middleware suivant
    next();
  } catch (error) {
    // En cas d'erreur, renvoyer une réponse 401 Unauthorized
    res.status(401).json({ error: 'Invalid request!' });
  }
};
