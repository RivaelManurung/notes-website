const noteService = require('../services/note_service');

exports.getNotes = async (req, res) => {
    try {
        const notes = await noteService.getNotesByOwner(req.userData.userId);
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNote = await noteService.createNote(title, content, req.userData.userId);
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedNote = await noteService.updateNote(id, req.userData.userId, req.body);
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await noteService.deleteNote(id, req.userData.userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};