const express = require('express');
const { getVaultItems, createVaultItem, deleteVaultItem } = require('../controllers/vaultController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const { vaultItemValidation } = require('../middleware/validation');
const { xssProtection } = require('../middleware/security');

const router = express.Router();

router.use(xssProtection);
router.use(authenticateToken);

router.get('/', getVaultItems);
router.post('/', vaultItemValidation, createVaultItem);
router.delete('/:id', deleteVaultItem);

module.exports = router;