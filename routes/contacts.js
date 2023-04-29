const routes = require('express').Router();
const lesson2Controller = require('../controllers/lesson2');

routes.get('/', lesson2Controller.getAllContacts);
routes.get('/:id', lesson2Controller.getOneContact);

module.exports = routes;