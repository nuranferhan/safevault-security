// API base URL
const API_BASE = '/api';

// Check if user is authenticated
function isAuthenticated() {
    return localStorage.getItem('token') !== null;
}

// Get auth token
function getToken() {
    return localStorage.getItem('token');
}

// Set auth token
function setToken(token) {
    localStorage.setItem('token', token);
}

// Remove auth token
function removeToken() {
    localStorage.removeItem('token');
}

// Make authenticated API request
async function apiRequest(url, options = {}) {
    const token = getToken();
    if (token) {
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        };
    }
    
    if (options.body && typeof options.body === 'object') {
        options.headers = {
            ...options.headers,
            'Content-Type': 'application/json'
        };
        options.body = JSON.stringify(options.body);
    }
    
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Request failed');
        }
        
        return data;
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}

// Show error message
function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

// Clear error message
function clearError() {
    const errorElement = document.getElementById('errorMessage');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

// Login form handler
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            clearError();
            
            const formData = new FormData(loginForm);
            const credentials = {
                username: formData.get('username'),
                password: formData.get('password')
            };
            
            try {
                const data = await apiRequest(`${API_BASE}/auth/login`, {
                    method: 'POST',
                    body: credentials
                });
                
                setToken(data.token);
                window.location.href = 'vault.html';
            } catch (error) {
                showError(error.message);
            }
        });
    }
    
    // Register form handler
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            clearError();
            
            const formData = new FormData(registerForm);
            const userData = {
                username: formData.get('username'),
                email: formData.get('email'),
                password: formData.get('password')
            };
            
            try {
                const data = await apiRequest(`${API_BASE}/auth/register`, {
                    method: 'POST',
                    body: userData
                });
                
                setToken(data.token);
                window.location.href = 'vault.html';
            } catch (error) {
                showError(error.message);
            }
        });
    }
    
    // Vault page handlers
    if (window.location.pathname.includes('vault.html')) {
        if (!isAuthenticated()) {
            window.location.href = 'login.html';
            return;
        }
        
        loadVaultItems();
        
        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
                removeToken();
                window.location.href = 'index.html';
            });
        }
        
        // Add item button
        const addItemBtn = document.getElementById('addItemBtn');
        const addItemForm = document.getElementById('addItemForm');
        const cancelBtn = document.getElementById('cancelBtn');
        
        if (addItemBtn) {
            addItemBtn.addEventListener('click', function() {
                addItemForm.style.display = 'block';
            });
        }
        
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function() {
                addItemForm.style.display = 'none';
                document.getElementById('vaultItemForm').reset();
            });
        }
        
        // Vault item form
        const vaultItemForm = document.getElementById('vaultItemForm');
        if (vaultItemForm) {
            vaultItemForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                clearError();
                
                const formData = new FormData(vaultItemForm);
                const itemData = {
                    title: formData.get('title'),
                    content: formData.get('content')
                };
                
                try {
                    await apiRequest(`${API_BASE}/vault`, {
                        method: 'POST',
                        body: itemData
                    });
                    
                    addItemForm.style.display = 'none';
                    vaultItemForm.reset();
                    loadVaultItems();
                } catch (error) {
                    showError(error.message);
                }
            });
        }
    }
});

// Load vault items
async function loadVaultItems() {
    try {
        const data = await apiRequest(`${API_BASE}/vault`);
        displayVaultItems(data.items);
    } catch (error) {
        showError(error.message);
    }
}

// Display vault items
function displayVaultItems(items) {
    const container = document.getElementById('vaultItems');
    if (!container) return;
    
    if (items.length === 0) {
        container.innerHTML = '<p>No vault items found. Add your first item!</p>';
        return;
    }
    
    container.innerHTML = items.map(item => `
        <div class="vault-item">
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.content)}</p>
            <small>Created: ${new Date(item.created_at).toLocaleString()}</small>
            <div class="actions">
                <button class="btn btn-secondary" onclick="deleteVaultItem(${item.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Delete vault item
async function deleteVaultItem(id) {
    if (!confirm('Are you sure you want to delete this item?')) {
        return;
    }
    
    try {
        await apiRequest(`${API_BASE}/vault/${id}`, {
            method: 'DELETE'
        });
        loadVaultItems();
    } catch (error) {
        showError(error.message);
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}