const express = require('express')
const router = express.Router()
const { verifySignUp } = require('../middlewares/index');
const auth = require("../controllers/auth")

// Registration Endpoint
router.post('/register', [verifySignUp.checkDuplicateEmailOrUsername], auth.register);


// Login Endpoint
router.post('/login', auth.login)

module.exports = router;