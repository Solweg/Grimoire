const express = require("express");
const router = express.Router();
const auth = require ("../middleware/auth.js");
const multer = require ("../middleware/multer-config.js");

const Book = require("../models/Book.js");


// Middleware POST: création de ressource, code 201
router.post("/", auth, multer, (req, res, next) => {
  delete req.body._id;
  const book = new Book({
    ...req.body,
  });
  book
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
});

// Route PUT pour modifier
router.put("/:id", auth, (req, res, next) => {
  Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
});

// Route DELETE pour supprimer
router.delete("/:id", auth, (req, res, next) => {
  Book.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
});

// Route GET pour récupérer un livre spécifique
router.get("/:id", auth,(req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error }));
});

// Route GET pour récupérer tous les livres
router.get("/", auth, (req, res, next) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = router;
