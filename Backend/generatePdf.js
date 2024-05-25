import PDFDocument from 'pdfkit';
import fs from 'fs';

/**
 * Función para generar un archivo PDF con los datos de todas las vistas.
 * @param {Array<string>} vistas - Una lista con los nombres de las vistas.
 * @param {Object} data - Un objeto con los datos de cada vista.
 * @returns {Promise<void>}
 */
export const generatePdf = (vistas, data) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const writeStream = fs.createWriteStream('VistasDatos.pdf');
        
        doc.pipe(writeStream);

        vistas.forEach(vista => {
            doc.addPage()
               .fontSize(20)
               .text(`Vista: ${vista}`, { underline: true });

            const rows = data[vista];

            rows.forEach(row => {
                doc.fontSize(12).text(JSON.stringify(row));
            });
        });

        doc.end();

        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
    });
};
