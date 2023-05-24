const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

// makeContact and updateContact made with help of solution (it mostly helped with the if/else statements),
// deleteContact made using parts of updateContact and with help of
// https://www.mongodb.com/docs/manual/reference/method/db.collection.deleteOne/

const makeContact = async (req, res) => {
    // #swagger.summary = 'W03 Make Contact'
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const result = await mongodb.getDb().db('cse341').collection('contacts').insertOne(contact);
    if(result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json(result.error || 'An error occurred while making the contact');
    }
    
}

const updateContact = async (req, res) => {
    // #swagger.summary = 'W03 Update Contact'
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    const contactId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const result = await mongodb.getDb().db('cse341').collection('contacts').replaceOne({_id: contactId}, contact);
    if(result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'An error occurred while updating the contact');
    }
}

const deleteContact = async (req, res) => {
    // #swagger.summary = 'W03 Delete Contact'
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('cse341').collection('contacts').deleteOne({_id: contactId});
    if(result.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(result.error || 'An error occurred while deleting the contact');
    }
}

module.exports = {
    makeContact,
    updateContact,
    deleteContact
};