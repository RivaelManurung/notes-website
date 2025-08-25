const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Registers a new user with validation checks.
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {object} The newly created user object.
 */
exports.registerUser = async (name, email, password) => {
    // Basic server-side validation for input data
    if (!name || !email || !password) {
        throw new Error('Name, email, and password are required.');
    }

    // Check if a user with the given email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        // Throw a specific error for the controller to catch and handle
        const error = new Error('Email sudah digunakan.');
        error.status = 409; // HTTP 409 Conflict
        throw error;
    }

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create the new user in the database
    const newUser = await User.create({ name, email, password: hashedPassword });

    // Exclude the password from the returned object for security
    newUser.password = undefined;

    return newUser;
};

/**
 * Authenticates a user and generates a JWT token upon successful login.
 * @param {string} email
 * @param {string} password
 * @returns {{ token: string, userId: number, name: string }} User credentials and token.
 */
exports.loginUser = async (email, password) => {
    // Check if the user exists in the database
    const user = await User.findOne({ where: { email } });
    if (!user) {
        // Throw a specific error for the controller to handle
        const error = new Error('Email atau password salah.');
        error.status = 401; // HTTP 401 Unauthorized
        throw error;
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        // Throw a specific error for the controller to handle
        const error = new Error('Email atau password salah.');
        error.status = 401; // HTTP 401 Unauthorized
        throw error;
    }

    // Generate a JWT token with user information in the payload
    const token = jwt.sign(
        { userId: user.id, name: user.name, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return { token, userId: user.id, name: user.name };
};