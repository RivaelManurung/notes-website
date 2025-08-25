const authService = require('../services/auth_service'); // Correct import path

/**
 * Handles user registration and returns a success response.
 * Provides specific error messages for different failure cases.
 */
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await authService.registerUser(name, email, password);
        return res.status(201).json({ message: 'Pendaftaran berhasil!', user });
    } catch (error) {
        console.error('Registration failed:', error);
        
        // Handle specific database unique constraint error (code '23505')
        if (error.original && error.original.code === '23505') {
            return res.status(409).json({ message: 'Email sudah digunakan.' });
        }
        
        // Handle custom errors from the authService (e.g., manual checks)
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        
        // Fallback for any other unexpected errors
        return res.status(400).json({ message: error.message || "Gagal mendaftar pengguna." });
    }
};

/**
 * Handles user login and returns a JWT token and user ID.
 * Provides specific error messages for different failure cases.
 */
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, userId, name } = await authService.loginUser(email, password);
        return res.status(200).json({ token, userId, name });
    } catch (error) {
        console.error('Login failed:', error);
        
        // Handle custom errors from the authService (e.g., user not found, wrong password)
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        
        // Fallback for any other unexpected errors
        return res.status(400).json({ message: error.message || "Gagal masuk pengguna." });
    }
};