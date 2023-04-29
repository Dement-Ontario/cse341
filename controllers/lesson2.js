const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Code for getAllContacts, getOneContact, and ObjectId from the solution, I had to specify the db name for mine to work

const getAllContacts = async (req,res,next) => {
    const result = await mongodb.getDb().db('cse341').collection('contacts').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getOneContact = async (req,res,next) => {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('cse341').collection('contacts').find({_id: contactId});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

module.exports = {
    getAllContacts,
    getOneContact
};