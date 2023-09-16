const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator'); // Import express-validator

const userController = require('../controllers/userController');

// Validation middleware for POST /users
const createUserValidation = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('location').optional(), // Location is optional
];

// Validation middleware for PUT /users/:id
const updateUserLocationValidation = [
  param('id').isMongoId().withMessage('Invalid user ID'), // Validate the user ID
  body('location').optional(), // Location is optional
];

// Define routes with validation
router.post('/users', createUserValidation, userController.createUser);
router.put('/users/:id', updateUserLocationValidation, userController.updateUserLocation);
router.get('/users/:id', userController.getUserById);

module.exports = router;
