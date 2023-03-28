/*
 * Auteur: Mathis Gauthier
 * Date: 6 mars 2023
 * Description: établir la connection avec la base de donnée
 */

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(cors());
// Connection to MongoDB Atlas
mongoose.set('strictQuery', false);
//mongoose.connect('mongodb+srv://Mathis:PWD@Cluster0.ulbngoc.mongodb.net/services_DEV1');
const encodedPassword = encodeURIComponent('PWD');
mongoose.connect(`mongodb+srv://Mathis:${encodedPassword}@Cluster0.ulbngoc.mongodb.net/services_DEV1`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((err) => {
    console.error('Failed to connect to MongoDB Atlas:', err);
});

// Middleware to parse the request body
app.use(express.json());

// Connection event listeners
const db = mongoose.connection;
db.on('error', (err) => {
    console.error('erreur de BD:', err);
});
db.once('open', () => {
    console.log('Connexion à la BD OK!!!');
});

// Routes
app.use('/', require('./routes/index')); // Default route
app.use("/api/Messages", require("./routes/apiMessages")); // API route for messages

// Start the server
app.listen(8000);
console.log('Service Web fonctionnel sur port 8000');
