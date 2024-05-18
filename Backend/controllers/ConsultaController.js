import { getInformacionPedidosByCliente } from '../queries.js';

export const obtenerInformacionPedidos = async (req, res) => {
    const { CedulaClienteConsultado } = req.params;

    try {
        const pedidos = await getInformacionPedidosByCliente(CedulaClienteConsultado);
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la información de los pedidos' });
    }
};