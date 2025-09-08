const rateLimit = require('express-rate-limit');

// Stricter rate limiting for auth endpoints
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 attempts per window
    message: { error: 'Too many authentication attempts, please try again later' },
    standardHeaders: true,
    legacyHeaders: false,
});

// XSS protection middleware
const xssProtection = (req, res, next) => {
    // Set XSS protection headers
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    
    next();
};

// SQL injection prevention (input sanitization is handled by express-validator)
const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;
    
    // Remove potential SQL injection patterns
    return input.replace(/['";\\]/g, '');
};

module.exports = {
    authLimiter,
    xssProtection,
    sanitizeInput
};