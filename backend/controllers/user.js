const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Définir le format de l'email
const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Inscription de l'utilisateur
exports.signup = (req, res, next) => {
  // Vérifier la validité de l'email
  if (!emailFormat.test(req.body.email)) {
    return res.status(400).json({ message: "E-mail invalide!" });
  }

  // Hachage du mot de passe
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });

      // Sauvegarder l'utilisateur dans la base de données
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Connexion de l'utilisateur
exports.login = (req, res, next) => {
  // Rechercher l'utilisateur par email
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Paire identifiant/mot de passe incorrecte" });
      }

      // Comparer le mot de passe fourni avec le mot de passe haché dans la base de données
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Paire identifiant/mot de passe incorrecte" });
          }

          // Générer un token JWT pour l'utilisateur
          const token = jwt.sign(
            { userId: user._id }, // Payload : les données incluses dans le token
            process.env.JWT_SECRET, // Clé secrète pour signer le token
            { expiresIn: "24h" } // Durée de validité du token
          );

          // Renvoyer le token JWT au client
          res.status(200).json({
            userId: user._id,
            token: token,
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
