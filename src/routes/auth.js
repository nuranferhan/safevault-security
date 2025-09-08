const express = require('express');
const { register, login } = require('../controllers/authController');
const { loginValidation, registerValidation } = require('../middleware/validation');
const { authLimiter, xssProtection } = require('../middleware/security');

const router = express.Router();

router.use(xssProtection);

router.post('/register', authLimiter, registerValidation, register);
router.post('/login', authLimiter, loginValidation, login);

module.exports = router;