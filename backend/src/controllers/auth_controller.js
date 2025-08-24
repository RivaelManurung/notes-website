// backend/controllers/authController.js
const authService = require('../services/auth_service'); // <-- Pastikan ini mengimpor file service

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await authService.registerUser(name, email, password);
        return res.status(201).json(user);
    } catch (error) {
        return res.status(400).json({ message: error.message || "Gagal mendaftar pengguna" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, userId, name } = await authService.loginUser(email, password);
        return res.status(200).json({ token, userId, name });
    } catch (error) {
        return res.status(400).json({ message: error.message || "Gagal masuk pengguna" });
    }
};