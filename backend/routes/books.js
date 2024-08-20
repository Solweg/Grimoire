const express = require( "express" );
const router = express.Router();
const Book = require("../models/Book.js");

//midleware post: creation de ressource code 201
router.post("/", (req, res, next) => {
    delete req.body.id;
    const book = new Book({
      ...req.body,
    });
    book
      .save()
      .then(() => res.status(201).json({ message: "Objet enregistré !" }))
      .catch((error) => res.status(400).json({ error }));
  });
  
  //route Put pour modifier
  
  router.put("/:id", (req, res, next) => {
    Book.updateOne({ id: req.params.id }, { ...req.body, id: req.params.id })
      .then(() => res.status(200).json({ message: "Objet supprimé !" }))
      .catch((error) => res.status(400).json({ error }));
  });
  
  //route Delete
  
  router.delete("/:id", (req, res, next) => {
    Book.deleteOne({ id: req.params.id })
      .then(() => res.status(200).json({ message: "Objet modifié !" }))
      .catch((error) => res.status(400).json({ error }));
  });
  
  router.get("/:id", (req, res, next) => {
    Book.findOne({ id: req.params.id })
    .then(() => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error }));
  });
  
  router.get("/", (req, res, next) => {
    Book.find()
    .then(() => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
  });

  module.exports = router;