import PDFDocument from 'pdfkit';
import fs from 'fs';

/**
 * Función para generar un archivo PDF con los datos de todas las vistas.
 * @param {Array<string>} vistas - Una lista con los nombres de las vistas.
 * @param {Object} data - Un objeto con los datos de cada vista.
 * @returns {Promise<void>}
 */
export const generatePdf = (data) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const writeStream = fs.createWriteStream('VistaDatos.pdf');
        
        doc.pipe(writeStream);

        doc.fontSize(20).text('Datos de la Vista', { underline: true });

        data.forEach(row => {
            doc.fontSize(12).text(JSON.stringify(row));
            doc.moveDown();
        });

        doc.end();

        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
    });
};
