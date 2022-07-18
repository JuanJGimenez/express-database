const { body } = require('express-validator');
module.exports = [
    body('name').notEmpty().withMessage('Name not empty'),
    body('price').notEmpty().withMessage('Price not empty'),
    body('description').notEmpty().withMessage('Description not empty'),
]