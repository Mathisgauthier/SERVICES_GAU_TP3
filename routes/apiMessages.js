/*
 * Auteur: Mathis Gauthier
 * Date: 6 mars 2023
 * Description: modèle Mongoose pour obtenir les informations des messages
 */
const express = require('express');
const router = express.Router();

const Messages = require('../modeles/Messages');

router.get('/', (requete, reponse) => {
    Messages.getMessages((err, Messages)=>{
        if (err) throw err;
        reponse.json(Messages);
    }, 5);
});

router.post('/', (requete, reponse) => {
    let Messages = requete.body;
    Messages.ajoutMessages( Messages, (err, retourMessages)=>{
        if (err) throw err;
        reponse.json(retourMessages);
    });
});

router.put('/:_idMessage', (requete, reponse)=>{
    let nouveauMessages = requete.body;
    Messages.modifierMessages(requete.params._idMessage, nouveauMessages, (err, resultat) => {
        if (err) throw err;
        reponse.json(resultat);
    });
});
router.delete('/:_idMessage', (requete, reponse)=>{
    Messages.supprimerMessages(requete.params._idMessage, (err, Messages) => {
        if (err) throw err;
        reponse.json(Messages);
    });
});
router.get('/_id/:_idMessage', (requete, reponse) => {
    Messages.getMessagesParChamp("_id", requete.params._idMessage, (err, Messages)=>{
        if (err) throw err;
        reponse.json(Messages);
    });
});
router.get('/titre/:titreMessages', (requete, reponse) => {
    Messages.getMessagesParChamp("titre", requete.params.titreMessages, (err, Messages)=>{
        if (err) throw err;
        reponse.json(Messages);
    });
});
router.get('/auteur/:auteurMessages', (requete, reponse) => {
    Messages.getMessagesParChamp("auteur", requete.params.auteurMessages, (err, Messages)=>{
        if (err) throw err;
        reponse.json(Messages);
    });
});
router.get('/description/:descMessages', (requete, reponse) => {
    Messages.getMessagesParChamp("description", requete.params.descMessages, (err, Messages)=>{
        if (err) throw err;
        reponse.json(Messages);
    });
});
router.get('/date/:dateMessages', (requete, reponse) => {
    Messages.getMessagesParChamp("date", requete.params.dateMessages, (err, Messages)=>{
        if (err) throw err;
        reponse.json(Messages);
    });
});
router.get('/langue/:langueMessages', (requete, reponse) => {
    Messages.getMessagesParChamp("langue", requete.params.langueMessages, (err, Messages)=>{
        if (err) throw err;
        reponse.json(Messages);
    });
});
router.get('/commentaires/:commentairesMessages', (requete, reponse) => {
    Messages.getMessagesParChamp("commentaires", requete.params.commentairesMessages, (err, Messages)=>{
        if (err) throw err;
        reponse.json(Messages);
    });
});

module.exports = router;
