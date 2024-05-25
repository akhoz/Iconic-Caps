import { getInformacionPedidosByCliente, getProductosCompradosByCliente , crearPedido, obtenerVista, getAllViews, getCantidadComprasPorProducto} from '../queries.js';
import { generatePdf} from '../generatePdf.js';

export const obtenerInformacionPedidos = async (req, res) => {
    const { CedulaClienteConsultado } = req.params;

    try {
        const pedidos = await getInformacionPedidosByCliente(CedulaClienteConsultado);
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la información de los pedidos' });
    }
};


export const obtenerProductosComprados = async (req, res) => {
    const { CedulaClienteConsultado } = req.params;

    try {
        const productos = await getProductosCompradosByCliente(CedulaClienteConsultado);
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos comprados' });
    }
};

export const crearNuevoPedido = async (req, res) => {
    const { CedulaClienteSolicitante, porcentajeGarantia, direccionIngresada } = req.body;

    try {
        const nuevaFactura = await crearPedido(CedulaClienteSolicitante, porcentajeGarantia, direccionIngresada);
        res.status(201).json({ NumeroFactura: nuevaFactura });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el pedido' });
    }
};

export const obtenerDatosDesdeVista = async (req, res) => {
    const { vista } = req.params;

    try {
        const datos = await obtenerVista(vista);
        res.status(200).json(datos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos desde la vista' });
    }
};

export const generarPdfConVistas = async (req, res) => {
    try {
        const vistas = await getAllViews();
        const data = {};

        for (const vista of vistas) {
            data[vista] = await obtenerVista(vista);
        }

        await generatePdf(vistas, data);

        res.download('VistasDatos.pdf', 'VistasDatos.pdf', (err) => {
            if (err) {
                res.status(500).json({ error: 'Error al descargar el PDF' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al generar el PDF' });
    }
};

export const obtenerCantidadComprasPorProducto = async (req, res) => {
    try {
        const resultados = await getCantidadComprasPorProducto();
        res.status(200).json(resultados);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
};