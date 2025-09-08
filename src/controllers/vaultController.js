const { db } = require('../database/db');

const getVaultItems = (req, res) => {
    const userId = req.user.id;
    
    db.all(
        'SELECT * FROM vault_items WHERE user_id = ? ORDER BY created_at DESC',
        [userId],
        (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to fetch vault items' });
            }
            res.json({ items: rows });
        }
    );
};

const createVaultItem = (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.id;

    db.run(
        'INSERT INTO vault_items (user_id, title, content) VALUES (?, ?, ?)',
        [userId, title, content],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to create vault item' });
            }
            res.status(201).json({
                message: 'Vault item created successfully',
                item: { id: this.lastID, title, content, user_id: userId }
            });
        }
    );
};

const deleteVaultItem = (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    db.run(
        'DELETE FROM vault_items WHERE id = ? AND user_id = ?',
        [id, userId],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to delete vault item' });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Vault item not found' });
            }
            res.json({ message: 'Vault item deleted successfully' });
        }
    );
};

module.exports = {
    getVaultItems,
    createVaultItem,
    deleteVaultItem
};