const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const exportController = require('../controllers/export_controller');

router.use(authMiddleware); // Semua route di sini dilindungi

router.get('/excel', exportController.exportExcel);
router.get('/pdf', exportController.exportPDF);

module.exports = router;