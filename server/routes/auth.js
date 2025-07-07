const router = require('express').Router();
const authCtrl = require('../controllers/authController');

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/users', authCtrl.getAllUsers);   // ← new

module.exports = router;
