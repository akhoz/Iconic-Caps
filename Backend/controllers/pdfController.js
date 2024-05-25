import { getAllViews, obtenerVista } from '../queries.js';
import { generatePdf } from '../generatePdf.js';


export const generarPdfConVistas = async (req, res) => {
    try {
        const vistas = await getAllViews();
    
        const datos = await Promise.all(vistas.map(async vista => {
            const datosVista = await obtenerVista(vista);
            return { titulo: vista, datos: datosVista };
        }));
    
        const mergedData = datos.flatMap(({ titulo, datos }) => [{ titulo }, ...datos]); // Fusionar los datos y los títulos
    
        // Formatear los datos para que se ajusten al formato deseado
        const formattedData = mergedData.map(item => {
            let formattedItem = "";
            for (const key in item) {
                if (Object.hasOwnProperty.call(item, key)) {
                    formattedItem +=  `${key}: ${item[key]} ` ;
                }
            }
            return formattedItem;
        });
    
        // Guardar el archivo PDF con los datos formateados
        await generatePdf(formattedData, 'VistaDatos.pdf');

        res.download('VistaDatos.pdf', 'VistaDatos.pdf', (err) => {
            if (err) {
                res.status(500).json({ error: 'Error al descargar el PDF' });
            }
        });
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        res.status(500).json({ error: 'Error al generar el PDF' });
    }
};

