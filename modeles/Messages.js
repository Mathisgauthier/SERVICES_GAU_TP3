/*
 * Auteur: Mathis Gauthier
 * Date: 6 mars 2023
 * Description: modèle Mongoose pour accéder à la collection messages
 */

const mongoose = require('mongoose');

// schéma de données pour la collection Messages

let schemaMessages = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    titre: {
        type: String,
        required: true
    },
    auteur: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    langue: {
        type: String,
        required: true
    },
    commentaires: {
        type: Array,
        required: false
    }
});

let Messages = module.exports = mongoose.model('Messages', schemaMessages);

module.exports.getMessages = (callback, limit) => {
    Messages.find(callback).limit(limit);
};

module.exports.getMessagesParChamp = (nomChamp, critere, callback, limit) => {
    const query = {[nomChamp]: RegExp(critere)};
    Messages.find(query, callback).limit(limit);
};

module.exports.ajoutMessages = (Messages, callback) => {
    Messages._id = new mongoose.Types.ObjectId();
    Messages.date = new Date();
    Messages.create(Messages, callback);
};

module.exports.supprimerMessages = (_idMessage, callback) => {
    let filtre = { "_id": _idMessage };
    Messages.deleteOne(filtre, callback);
};

module.exports.modifierMessages = (_idMessage, nouvMessages, callback) => {
    let filtre = { "_id": _idMessage };
    let options = { };
    let nouveauMessages = {
        _id: nouvMessages._id,
        titre: nouvMessages.titre,
        auteur: nouvMessages.auteur,
        description: nouvMessages.description,
        date: nouvMessages.date,
        langue: nouvMessages.langue,
        commentaires: nouvMessages.commentaires,
    };
    Messages.findOneAndUpdate(filtre, nouveauMessages, options, callback);
};
