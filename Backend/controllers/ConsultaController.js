import { getInformacionPedidosByCliente, getProductosCompradosByCliente } from '../queries.js';

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