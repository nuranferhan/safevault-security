# SafeVault Security Project

A secure password management application demonstrating comprehensive security practices including input validation, SQL injection prevention, authentication/authorization, and vulnerability remediation.

## Technologies Used

**Backend**
- Node.js
- Express.js
- SQLite3
- JWT (JSON Web Tokens)
- bcryptjs
- Helmet.js
- express-validator

**Frontend**
- HTML5
- CSS3
- Vanilla JavaScript
- Fetch API

**Testing**
- Jest
- Supertest

## Project Structure

```
safevault-security/
├── src/
│   ├── app.js                 # Main application entry point
│   ├── models/
│   │   └── User.js            # User model with database operations
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   └── vaultController.js # Vault operations logic
│   ├── middleware/
│   │   ├── auth.js            # JWT authentication middleware
│   │   ├── validation.js      # Input validation middleware
│   │   └── security.js        # Security middleware
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   └── vault.js           # Vault routes
│   └── database/
│       └── db.js              # Database configuration
├── tests/
│   ├── auth.test.js           # Authentication tests
│   ├── validation.test.js     # Input validation tests
│   └── security.test.js       # Security tests
├── public/
│   ├── index.html             # Homepage
│   ├── login.html             # Login page
│   ├── register.html          # Registration page
│   ├── vault.html             # Vault management page
│   ├── styles.css             # Application styles
│   └── script.js              # Frontend JavaScript
├── package.json               # Dependencies and scripts
└── README.md                  # Project documentation
```

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/safevault-security.git
cd safevault-security
```

2. Install dependencies
```bash
npm install
```

3. Start the application
```bash
npm start
```

4. Access the application at `http://localhost:3000`

## Usage

### Default Admin Account
- Username: admin
- Password: admin123

### Available Features
- User registration and authentication
- Secure password storage
- Role based access control
- Encrypted data storage
- Session management

## Security Features

### Input Validation
- Server side validation using express-validator
- HTML encoding to prevent XSS attacks
- Input length limits and character restrictions
- Email validation and normalization

### SQL Injection Prevention
- Parameterized queries using prepared statements
- Input sanitization middleware
- No dynamic SQL construction

### Authentication and Authorization
- JWT tokens for session management
- bcrypt password hashing with salt rounds
- Role based access control (RBAC)
- Token expiration and validation

### Security Headers
- Helmet.js for comprehensive security headers
- CORS configuration
- Rate limiting on authentication endpoints
- XSS protection headers

## Testing

Run the test suite to verify security implementations:

```bash
npm test
```

Tests cover:
- Authentication flows
- Input validation
- SQL injection prevention
- XSS protection
- Rate limiting
- Authorization checks

## Vulnerabilities Addressed

### SQL Injection
**Issue**: Potential database manipulation through malicious input
**Solution**: Implemented parameterized queries and input sanitization
**Verification**: Comprehensive test coverage for injection attempts

### Cross Site Scripting (XSS)
**Issue**: Malicious script execution in user browsers
**Solution**: HTML encoding, CSP headers, and input validation
**Verification**: XSS payload testing and sanitization verification

### Authentication Bypass
**Issue**: Unauthorized access to protected resources
**Solution**: Strong JWT implementation with proper validation
**Verification**: Token validation and expiration testing

### Brute Force Attacks
**Issue**: Unlimited authentication attempts
**Solution**: Rate limiting on sensitive endpoints
**Verification**: Rate limit testing and blocking verification

## Microsoft Copilot Integration

This project demonstrates security best practices with Microsoft Copilot assistance in:
- Secure code generation for authentication systems
- Input validation schema creation
- Security middleware implementation
- Test case development for vulnerability assessment
- Security documentation and best practices

## License

MIT License