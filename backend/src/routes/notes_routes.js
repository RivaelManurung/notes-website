const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const noteController = require('../controllers/note_controller');

router.use(authMiddleware); // Semua route di sini dilindungi oleh middleware

router.get('/', noteController.getNotes);
router.post('/', noteController.createNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;