# Mon Vieux Grimoire 📚

**Mon Vieux Grimoire** est une application web permettant de gérer des livres de manière sécurisée. Ce projet est développé avec une architecture **front-end** et **back-end** séparée, permettant la gestion des utilisateurs, des livres et des images associées.

## Fonctionnalités principales

- **Gestion des livres** : Ajout, modification, suppression et consultation de livres.
- **Authentification sécurisée** : Authentification via JWT (JSON Web Tokens) pour sécuriser les utilisateurs.
- **Téléchargement d'images** : Utilisation de **Multer** et **Sharp** pour le traitement et la gestion des images.
- **API REST** : Création d'une API pour gérer les données côté serveur.

## Technologies utilisées

- **Front-end** : HTML, CSS, JavaScript (React)
- **Back-end** : Node.js, Express
- **Base de données** : MongoDB
- **Authentification** : JWT (JSON Web Tokens)
- **Gestion des images** : Multer et Sharp

## Installation et lancement du projet

### Prérequis

- Avoir **Node.js** et **npm** installés sur votre machine.
- Avoir une instance MongoDB locale ou via un service cloud (MongoDB Atlas par exemple).

### Étapes pour lancer le backend

1. Clonez le dépôt sur votre machine :

    ```bash
    git clone <url-du-repository>
    ```

2. Accédez au répertoire du backend :

    ```bash
    cd backend
    ```

3. Créez un fichier `.env` à la racine du répertoire backend. Copiez-y les informations nécessaires présentes dans le livrable (comme les clés JWT et l'URI MongoDB).

4. Installez les dépendances du projet :

    ```bash
    npm install
    ```

5. Démarrez le serveur avec Nodemon :

    ```bash
    nodemon server
    ```

### Étapes pour lancer le frontend

1. Accédez au répertoire du frontend :

    ```bash
    cd frontend
    ```

2. Installez les dépendances du projet :

    ```bash
    npm install
    ```

3. Démarrez le serveur de développement :

    ```bash
    npm start
    ```

### Accès à l'application

- **Frontend** : [http://localhost:3000](http://localhost:3000)
- **Backend** : [http://localhost:5000](http://localhost:5000)

### Important

- Pour éviter tout conflit, utilisez deux instances de VSCode ou deux terminaux séparés pour le backend et le frontend.
- Le backend et le frontend doivent être lancés séparément.

## Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir des issues ou à soumettre des pull requests pour toute amélioration ou correction de bug.

## Auteurs

Développé dans le cadre de la formation en développement web.
