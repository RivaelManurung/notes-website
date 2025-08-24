// backend/services/authService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerUser = async (name, email, password) => {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('Email sudah digunakan.');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ name, email, password: hashedPassword });
    newUser.password = undefined;
    return newUser;
};

exports.loginUser = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error('User tidak ditemukan.');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Password salah.');
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token, userId: user.id, name: user.name };
};