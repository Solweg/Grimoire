// Importer le modèle Book
const Book = require('../models/Book');

// Fonction pour noter un livre et recalculer la moyenne
exports.rateBook = (req, res, next) => {
    const { grade } = req.body;  // La note envoyée par l'utilisateur
    const userId = req.auth.userId; // ID de l'utilisateur authentifié

    // Recherchez le livre par son ID
    Book.findOne({ _id: req.params.id })
        .then(book => {
            if (!book) {
                return res.status(404).json({ message: "Livre non trouvé." });
            }

            // Vérifiez si l'utilisateur a déjà noté ce livre
            const existingRating = book.ratings.find(rating => rating.userId === userId);

            if (existingRating) {
                // Si l'utilisateur a déjà noté, mettre à jour la note
                existingRating.grade = grade;
            } else {
                // Sinon, ajoutez la nouvelle note
                book.ratings.push({ userId: userId, grade: grade });
            }

            // Recalculez la moyenne des notes
            const totalRatings = book.ratings.length;
            const sumRatings = book.ratings.reduce((sum, rating) => sum + rating.grade, 0);
            book.averageRating = sumRatings / totalRatings;

            // Sauvegardez le livre avec la nouvelle note et la nouvelle moyenne
            book.save()
                .then(() => res.status(200).json({ message: "Note ajoutée avec succès !", averageRating: book.averageRating }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
