const { body, validationResult } = require('express-validator');

const validateInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const loginValidation = [
    body('username')
        .trim()
        .isLength({ min: 3, max: 20 })
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('Username must be 3-20 characters and contain only letters, numbers, and underscores'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
    validateInput
];

const registerValidation = [
    body('username')
        .trim()
        .isLength({ min: 3, max: 20 })
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('Username must be 3-20 characters and contain only letters, numbers, and underscores'),
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Valid email required'),
    body('password')
        .isLength({ min: 6 })
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must be at least 6 characters with uppercase, lowercase, and number'),
    validateInput
];

const vaultItemValidation = [
    body('title')
        .trim()
        .isLength({ min: 1, max: 100 })
        .escape()
        .withMessage('Title must be 1-100 characters'),
    body('content')
        .trim()
        .isLength({ min: 1, max: 1000 })
        .escape()
        .withMessage('Content must be 1-1000 characters'),
    validateInput
];

module.exports = {
    loginValidation,
    registerValidation,
    vaultItemValidation,
    validateInput
};