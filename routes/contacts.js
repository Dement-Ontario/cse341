const routes = require('express').Router();
const lesson2Controller = require('../controllers/lesson2');
const lesson3Controller = require('../controllers/lesson3');

// Lesson 2
routes.get('/', lesson2Controller.getAllContacts);
routes.get('/:id', lesson2Controller.getOneContact);

// Lesson 3
routes.post('/', lesson3Controller.makeContact);
routes.put('/:id', lesson3Controller.updateContact);
routes.delete('/:id', lesson3Controller.deleteContact);

module.exports = routes;