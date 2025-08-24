// backend/models/User.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: { // <-- Tambahkan field name
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: { // <-- Ubah dari username menjadi email
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    set(value) {
      this.setDataValue('email', value.trim().toLowerCase()); // Trim dan lowercase email
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users'
});

module.exports = User;