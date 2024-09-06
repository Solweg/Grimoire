const Book = require('../models/Book');
const fs = require('fs');

// Créer un livre
exports.createBook = (req, res, next) => {
    // Vérifiez si un fichier a été téléchargé
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded!' });
    }

    // Vérifiez si des données de livre ont été fournies
    if (!req.body.book) {
        return res.status(400).json({ message: 'No book data!' });
    }

    let bookObject;
    try {
        // Convertit les données de livre de JSON en objet JavaScript
        bookObject = JSON.parse(req.body.book);
    } catch (error) {
        return res.status(400).json({ message: 'Invalid book data!' });
    }

    // Vérifie que tous les champs requis sont présents
    if (!bookObject.title || !bookObject.author || !bookObject.year || !bookObject.genre) {
        return res.status(400).json({ message: 'Missing required book fields!' });
    }

    // Supprime les champs potentiellement dangereux
    delete bookObject._id;
    delete bookObject._userId;

    // Crée un nouvel objet livre avec les données fournies
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        averageRating: bookObject.ratings ? bookObject.ratings[0].grade : 0
    });

    // Sauvegarde le livre dans la base de données
    book.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

// Mettre à jour un livre
exports.updateBook = (req, res, next) => {
    try {
        const book = req.file ? {
            ...JSON.parse(req.body.book),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        } : { ...req.body };

        // Met à jour le livre dans la base de données
        Book.updateOne({ _id: req.params.id }, { ...book, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet modifié !' }))
            .catch(error => res.status(400).json({ error }));
    } catch {
        return res.status(400).json({ message: 'Invalid book data!' });
    }
};

// Supprimer un livre avec suppression de l'image associée
exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => {
            if (book.userId !== req.auth.userId) {
                return res.status(403).json({ message: 'Non-autorisé' });
            }
            const filename = book.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
                Book.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                    .catch(error => res.status(401).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

// Récupérer un livre spécifique
exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }));
};

// Récupérer tous les livres
exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
};

// Fonction pour noter un livre et recalculer la moyenne
exports.rateBook = (req, res, next) => {
    const { rating } = req.body;
    const userId = req.auth.userId;

    // Vérifie que la note est comprise entre 0 et 5
    if (rating < 0 || rating > 5) {
        return res.status(400).json({ message: 'La note doit être comprise entre 0 et 5.' });
    }

    // Recherche le livre par son ID
    Book.findOne({ _id: req.params.id })
        .then(book => {
            if (!book) {
                return res.status(404).json({ message: 'Livre non trouvé.' });
            }

            // Vérifie si l'utilisateur a déjà noté ce livre
            const existingRatingIndex = book.ratings.findIndex(r => r.userId === userId);

            if (existingRatingIndex !== -1) {
                // Met à jour la note existante
                book.ratings[existingRatingIndex].grade = rating;
            } else {
                // Ajoute une nouvelle note
                book.ratings.push({ userId: userId, grade: rating });
            }

            // Recalcule la moyenne des notes
            const totalRatings = book.ratings.length;
            const sumRatings = book.ratings.reduce((sum, r) => sum + r.grade, 0);
            book.averageRating = sumRatings / totalRatings;

            // Sauvegarde le livre avec la nouvelle note et la nouvelle moyenne
            book.save()
                .then(() => res.status(201).json(book))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Fonction pour récupérer les livres avec les meilleures notes
exports.getBestRatedBooks = (req, res, next) => {
    // Trouve tous les livres et les trie par averageRating en ordre décroissant, puis limite à 5 résultats
    Book.find().sort({ averageRating: -1 }).limit(5)
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
};
