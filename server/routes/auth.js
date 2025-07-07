const router = require('express').Router();
const authCtrl = require('../controllers/authController');
const { body } = require('express-validator');
const validate = require('../middleware/validate');

// Registration route with validation
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
  ],
  validate,
  authCtrl.register
);

// Login route with validation
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validate,
  authCtrl.login
);

// Remove or protect this route if not needed
// router.get('/users', authCtrl.getAllUsers);

module.exports = router;
