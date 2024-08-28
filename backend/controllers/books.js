const Book = require('../models/Book');
const fs = require("fs");

// Créer un livre
exports.createBook = (req, res, next) => {
    console.log('Received request to create a book');

    if (!req.file) {
        console.log('No file uploaded');
        return res.status(400).json({ message: 'No file uploaded!' });
    }

    if (!req.body.book) {
        console.log('No book data provided');
        return res.status(400).json({ message: 'No book data!' });
    }

    let bookObject;
    try {
        bookObject = JSON.parse(req.body.book);
    } catch (error) {
        console.log('Error parsing book data:', error);
        return res.status(400).json({ message: 'Invalid book data!' });
    }

    console.log('Parsed book data:', bookObject);

    // Vérification des champs requis
    if (!bookObject.title || !bookObject.author || !bookObject.year || !bookObject.genre) {
        console.log('Missing required book fields');
        return res.status(400).json({ message: 'Missing required book fields!' });
    }

    delete bookObject._id;
    delete bookObject._userId;

    console.log('Book object after deleting ids:', bookObject);

    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        averageRating: bookObject.ratings ? bookObject.ratings[0].grade : 0
    });

    book.save()
        .then(() => {
            console.log('Book saved successfully');
            res.status(201).json({ message: "Objet enregistré !" });
        })
        .catch(error => {
            console.error('Error saving the book:', error);
            res.status(400).json({ error });
        });
};

// Mettre à jour un livre
exports.updateBook = (req, res, next) => {
    Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Objet modifié !" }))
        .catch((error) => res.status(400).json({ error }));
};

// Supprimer un livre avec suppression de l'image associée
exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => {
            if (book.userId !== req.auth.userId) {
                return res.status(403).json({ message: "Non-autorisé" });
            } else {
                const filename = book.imageUrl.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    Book.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: "Objet supprimé !" }))
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

// Récupérer un livre spécifique
exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then((book) => res.status(200).json(book))
        .catch((error) => res.status(404).json({ error }));
};

// Récupérer tous les livres
exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then((books) => res.status(200).json(books))
        .catch((error) => res.status(400).json({ error }));
};

// Fonction pour noter un livre et recalculer la moyenne
exports.rateBook = (req, res, next) => {
    const { rating } = req.body;  // La note envoyée par l'utilisateur
    const userId = req.auth.userId; // ID de l'utilisateur authentifié
   
    // Recherchez le livre par son ID
    Book.findOne({ _id: req.params.id })
        .then(book => {
            if (!book) {
                return res.status(404).json({ message: "Livre non trouvé." });
            }

            // Vérifiez si l'utilisateur a déjà noté ce livre
            const existingRating = book.ratings.some(rating => rating.userId === userId);

            if (existingRating) {
                // Si l'utilisateur a déjà noté, mettre à jour la note
                // existingRating.grade = grade;
            return res.status(403).json({ message: "Livre déjà noté !" });
                
            } 
            

            book.ratings.push({ userId: userId, grade: rating});

            // Recalculez la moyenne des notes
            const totalRatings = book.ratings.length;
            const sumRatings = book.ratings.reduce((sum, rating) => sum + rating.grade, 0);
            book.averageRating = sumRatings / totalRatings;

            // Sauvegardez le livre avec la nouvelle note et la nouvelle moyenne
            book.save()
                .then(() => res.status(201).json( Book ))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

