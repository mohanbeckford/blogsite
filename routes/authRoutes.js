const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup); //USER SIGN UP
router.post('/login', authController.login); // USER LOGIN
router.get('/logout', authController.logout);// USER LOGOUT

module.exports = router;

