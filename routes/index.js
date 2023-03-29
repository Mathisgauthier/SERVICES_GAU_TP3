const express = require('express');
const router = express.Router();
const Messages = require('../modeles/Messages');


router.get('/', (requete, reponse) => {
    reponse.send('Utilisez /api/Messages');
});

router.get('/index.html', (requete, reponse) => {
    lirePageWeb('index.html', reponse);
});

router.get('/public/*', (requete, reponse) => {
    lirePageWeb(requete.url, reponse);
});

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
