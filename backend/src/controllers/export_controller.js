const exportService = require('../services/export_service');

exports.exportExcel = async (req, res) => {
    try {
        const workbook = await exportService.exportToExcel(req.userData.userId);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=notes.xlsx');
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengekspor ke Excel.', error: error.message });
    }
};

exports.exportPDF = async (req, res) => {
    try {
        const doc = await exportService.exportToPDF(req.userData.userId);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=notes.pdf');
        doc.pipe(res);
        doc.end();
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengekspor ke PDF.', error: error.message });
    }
};