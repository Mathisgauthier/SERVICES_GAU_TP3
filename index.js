/*
 * Auteur: Mathis Gauthier
 * Date: 27 mars 2023
 * Description: établir la connection avec la base de donnée
 */

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const cors = require('cors');

app.use(cors());

mongoose.set('strictQuery', false);
mongoose.connect(`mongodb+srv://Mathis:PWD@Cluster0.ulbngoc.mongodb.net/services_DEV1`, {
}).then(() => {
    console.log('Connecté à MongoDB Atlas!');
}).catch((err) => {
    console.error('Connexion impossible', err);
});


app.use(express.json());
app.get('/api/aide', (req, res) => {
    res.sendFile(path.join(__dirname, 'aide.html'));
});
app.get('/api/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


const db = mongoose.connection;
db.on('error', (err) => {
    console.error('erreur de BD:', err);
});
db.once('open', () => {
    console.log('Connexion à la BD OK!!!');
});


app.use('/', require('./routes/index')); 
app.use("/api/Messages", require("./routes/apiMessages")); 


app.listen(8000);
console.log('Service Web fonctionnel sur port 8000');
