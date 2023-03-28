const express = require('express');
const router = express.Router();
const Messages = require('../modeles/Messages');

// Default route
router.get('/', (requete, reponse) => {
    reponse.send('Utilisez /api/Messages');
});

// Route to serve index.html file
router.get('/index.html', (requete, reponse) => {
    lirePageWeb('index.html', reponse);
});

// Route to serve static files
router.get('/public/*', (requete, reponse) => {
    lirePageWeb(requete.url, reponse);
});

// Route to get all messages
router.get('/api/messages', (requete, reponse) => {
    Messages.find({}, (err, messages) => {
        if (err) throw err;
        reponse.json(messages);
    });
});

// Route to get a specific message by ID
router.get('/api/messages/:id', (requete, reponse) => {
    Messages.findOne({_id: requete.params.id}, (err, message) => {
        if (err) throw err;
        reponse.json(message);
    });
});

// Function to read a web page file and serve it as a response
function lirePageWeb(nomPageWeb, reponse) {
    const fs = require('fs');
    const path = require('path');
    const fichier = path.join(__dirname, "..", "public", nomPageWeb);

    fs.readFile(fichier, (err, contenu) => {
        if (err) {
            reponse.status(500).send('Erreur serveur Web: '+err.code);
        } else {
            reponse.status(200).set( {'Content-type': 'text/html'} ).send(contenu);
        }
    });
}

module.exports = router;
