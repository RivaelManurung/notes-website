const Note = require('../models/Note');

exports.getNotesByOwner = (ownerId) => Note.findAll({ where: { ownerId } });

exports.createNote = async (title, content, ownerId) => {
    const newNote = await Note.create({ title, content, ownerId });
    return newNote;
};

exports.getNoteById = (id, ownerId) => Note.findOne({ where: { id, ownerId } });

exports.updateNote = async (id, ownerId, updateData) => {
    const note = await Note.findOne({ where: { id, ownerId } });
    if (!note) {
        throw new Error('Catatan tidak ditemukan atau Anda tidak memiliki izin.');
    }
    await note.update(updateData);
    return note;
};

exports.deleteNote = async (id, ownerId) => {
    const note = await Note.findOne({ where: { id, ownerId } });
    if (!note) {
        throw new Error('Catatan tidak ditemukan atau Anda tidak memiliki izin.');
    }
    await note.destroy();
    return { message: 'Catatan berhasil dihapus.' };
};