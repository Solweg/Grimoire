const http = require('http');
const app = require('./app');
require('dotenv').config();

// Fonction pour normaliser le port en un nombre, une chaîne ou false
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val; // Si le port n'est pas un nombre, retourne la valeur telle quelle
  }
  if (port >= 0) {
    return port; // Si le port est un nombre valide, retourne le port
  }
  return false; // Retourne false pour un port non valide
};

// Définition du port de l'application
const port = normalizePort(process.env.PORT || '4000');
app.set('port', port);

// Gestionnaire d'erreurs pour le serveur HTTP
const errorHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  
  // Gestion des différentes erreurs de démarrage du serveur
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Création du serveur HTTP
const server = http.createServer(app);

// Gestion des événements d'erreur et d'écoute du serveur
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// Démarrage du serveur sur le port défini
server.listen(port);
