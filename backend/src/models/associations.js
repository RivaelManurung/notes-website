const User = require('./User');
const Note = require('./Note');

// Hubungan: Satu User memiliki banyak Notes
User.hasMany(Note, { 
  foreignKey: 'ownerId', 
  onDelete: 'CASCADE' 
});

// Hubungan: Satu Note dimiliki oleh satu User
Note.belongsTo(User, { 
  foreignKey: 'ownerId' 
});

// Export model-model yang sudah terhubung
module.exports = { User, Note };