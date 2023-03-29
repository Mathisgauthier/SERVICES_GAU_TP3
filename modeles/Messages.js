/*
 * Auteur: Mathis Gauthier
 * Date: 27 mars 2023
 * Description: modèle Mongoose pour accéder à la collection messages
 */
const mongoose = require('mongoose');

const commentaireSchema = new mongoose.Schema({
    commentaire: String,
    auteur: String,
    date: Date,
});

const messageSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
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
    commentaires: [commentaireSchema]
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;

module.exports.getMessages = (callback, limit) => {
    Message.find(callback).limit(limit);
};

module.exports.getMessagesParChamp = (nomChamp, critere, callback, limit) => {
    const query = {[nomChamp]: RegExp(critere)};
    Message.find(query, callback).limit(limit);
};

module.exports.ajoutMessages = (nouveauMessage, callback) => {
    const messageToCreate = {
        ...nouveauMessage,
        _id: new mongoose.Types.ObjectId(),
        date: new Date(),
    };
    Message.create(messageToCreate, callback);
};


module.exports.supprimerMessages = (_idMessage, callback) => {
    let filtre = { "_id": _idMessage };
    Message.deleteOne(filtre, callback);
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
    Message.findOneAndUpdate(filtre, nouveauMessages, options, callback);
};
