const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Code for getAllContacts, getOneContact, and ObjectId from the solution, I had to specify the db name for mine to work

const getAllContacts = async (req,res,next) => {
    // #swagger.summary = 'W02 Get All Contacts'
    const result = await mongodb.getDb().db('cse341').collection('contacts').find();
    result.toArray((error, lists) => {
        if(error) {
            res.status(400).json(error || 'an error happened while getting contacts');
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getOneContact = async (req,res,next) => {
    // #swagger.summary = 'W02 Get One Contact'
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('cse341').collection('contacts').find({_id: contactId});
    result.toArray((lists) => {
        if(error) {
            res.status(400).json(error || 'an error happened while getting contact');
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

module.exports = {
    getAllContacts,
    getOneContact
};