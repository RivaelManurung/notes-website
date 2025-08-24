const Note = require('../models/Note');
const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');

exports.exportToExcel = async (ownerId) => {
    const notes = await Note.findAll({ where: { ownerId } });
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Notes');

    worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Title', key: 'title', width: 30 },
        { header: 'Content', key: 'content', width: 50 },
        { header: 'Created At', key: 'createdAt', width: 20 },
    ];
    
    worksheet.addRows(notes.map(note => note.toJSON()));
    
    return workbook;
};

exports.exportToPDF = async (ownerId) => {
    const notes = await Note.findAll({ where: { ownerId } });
    const doc = new PDFDocument();
    
    doc.fontSize(25).text('My Notes', { align: 'center' });
    doc.moveDown();

    notes.forEach(note => {
        doc.fontSize(18).text(`Title: ${note.title}`);
        doc.fontSize(12).text(`Content: ${note.content}`);
        doc.fontSize(10).text(`Created At: ${note.createdAt.toLocaleString()}`);
        doc.moveDown(1);
    });

    return doc;
};