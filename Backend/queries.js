import db from './database/db.js';

export const getInformacionPedidosByCliente = async (CedulaClienteConsultado) => {
    const query = `
        SELECT 
            pedido.NumeroFactura, 
            listaproductospedidos.ModeloProducto, 
            listaproductospedidos.CantidadProducto, 
            envioxpedido.Estado,
            FechaDeCompra,
            CONCAT(persona.Nombre, ' ', persona.PrimerApellido, ' ', persona.SegundoApellido) AS Repartidor 
        FROM pedido
        JOIN listaproductospedidos ON pedido.NumeroFactura = listaproductospedidos.NumeroFacturaPedido
        JOIN envioxpedido ON pedido.NumeroFactura = envioxpedido.NumeroFacturaPedido
        JOIN repartidor ON envioxpedido.CedulaRepartidor = repartidor.CedulaRepartidor
        JOIN persona ON repartidor.CedulaRepartidor = persona.Cedula
        WHERE pedido.CedulaCliente = :CedulaClienteConsultado;
    `;

    try {
        const results = await db.query(query, {
            replacements: { CedulaClienteConsultado },
            type: db.QueryTypes.SELECT,
        });
        return results;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
};
