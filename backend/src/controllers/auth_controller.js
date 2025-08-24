const authService = require('../services/auth_service');

exports.register = async (req, res) => {
    try {
        const user = await authService.registerUser(req.body);
        return res.status(201).json(user);
    } catch (error) {
        return res.status(400).json({ message: error.message || "Gagal mendaftar pengguna" });
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password} = req.body;
        const  {userId, token} = await authService.loginUser(username, password);
        return res.status(200).json({ userId, token });
    } catch (error) {
        return res.status(400).json({ message: error.message || "Gagal masuk pengguna" });
    }
}