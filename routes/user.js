const express = require('express');
const User = require('../controllers/user');
const router = express.Router();

router.route('/register').post(User.register);
router.route('/signIn').post(User.signInUser);

module.exports = router;