const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log("Token reçu:", token); // Vérifiez que le token est bien reçu
        
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token décodé :", decodedToken); // Vérifiez que le token est bien décodé

        req.auth = {
            userId: decodedToken.userId
        };
        next();
    } catch (error) {
        console.error("Erreur d'authentification:", error.message); // Log d'erreur
        res.status(401).json({ error: 'Invalid request!' });
    }
};
