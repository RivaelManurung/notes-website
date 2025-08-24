const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Note = sequelize.define('Note', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'notes'
});

module.exports = Note;