const { check } = require('express-validator');
 
exports.contactValidation = [
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('favoriteColor', 'Favorite color is required').not().isEmpty(),
    check('birthday', 'Please make a birthday like 01/03').matches(/((0[1-9])|(1[0-2]))\/((0[1-9])|([1-2][0-9])|(3[0-1]))/)
]