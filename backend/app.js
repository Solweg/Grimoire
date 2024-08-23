const express = require("express");
const app = express();
const mongoose = require("mongoose");
const booksRoutes = require("./routes/books.js");
const userRoutes = require("./routes/user.js");


mongoose
  .connect(
    "mongodb+srv://user00:test123@grimoire.hgl1l.mongodb.net/?retryWrites=true&w=majority&appName=Grimoire"
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/books", booksRoutes);
app.use("/api/auth", userRoutes);


module.exports = app;
