const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  console.log("Login route accessed");

  // Ajout d'un log pour vérifier la clé secrète utilisée
  console.log("Clé secrète utilisée pour signer le token :", process.env.JWT_SECRET);
  
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Paire identifiant/mot de passe incorrecte" });
      }
      bcrypt.compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ message: "Paire identifiant/mot de passe incorrecte" });
          }
          
          // Générer un token JWT si l'authentification est réussie
          const token = jwt.sign(
            { userId: user._id },                 // Payload : les données incluses dans le token
            process.env.JWT_SECRET,               // Clé secrète pour signer le token
            { expiresIn: "24h" }                  // Durée de validité du token
          );
          
          console.log("Token généré :", token); // Ajout d'un log pour voir le token généré

          // Renvoyer le token JWT au client
          res.status(200).json({
            userId: user._id,
            token: token
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
