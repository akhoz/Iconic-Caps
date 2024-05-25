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

export const getProductosCompradosByCliente = async (CedulaClienteConsultado) => {
    const query = `
        SELECT listaproductospedidos.ModeloProducto 
        FROM cliente
        JOIN pedido ON cliente.CedulaCliente = pedido.CedulaCliente
        JOIN listaproductospedidos ON pedido.NumeroFactura = listaproductospedidos.NumeroFacturaPedido
        WHERE cliente.CedulaCliente = :CedulaClienteConsultado;
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

export const crearPedido = async (CedulaClienteSolicitante, porcentajeGarantia, direccionIngresada) => {
    const transaction = await db.transaction();
    try {
        // 1. Seleccionar un repartidor al azar
        const [repartidor] = await db.query(
            `SELECT CedulaRepartidor 
             FROM repartidor 
             ORDER BY RAND() 
             LIMIT 1`,
            { type: db.QueryTypes.SELECT, transaction }
        );
        const cedulaRepartidor = repartidor.CedulaRepartidor;

        // 2. Crear un nuevo pedido
        const [pedidoResult] = await db.query(
            `INSERT INTO pedido (CedulaCliente, FechaDeCompra) 
             VALUES (:CedulaClienteSolicitante, NOW())`,
            {
                replacements: { CedulaClienteSolicitante },
                type: db.QueryTypes.INSERT,
                transaction,
            }
        );

        // 3. Obtener el número de factura del nuevo pedido
        const [nuevoPedido] = await db.query(
            `SELECT NumeroFactura 
             FROM pedido 
             ORDER BY NumeroFactura DESC 
             LIMIT 1`,
            { type: db.QueryTypes.SELECT, transaction }
        );
        const nuevaFactura = nuevoPedido.NumeroFactura;

        // 4. Insertar una garantía para el pedido
        await db.query(
            `INSERT INTO garantiaxpedido (NumeroFacturaPedido, FechaInicio, FechaFinal, TipoGarantia) 
             VALUES (:nuevaFactura, NOW(), DATE_ADD(NOW(), INTERVAL 1 YEAR), :porcentajeGarantia)`,
            {
                replacements: { nuevaFactura, porcentajeGarantia },
                type: db.QueryTypes.INSERT,
                transaction,
            }
        );

        // 5. Insertar un envío para el pedido
        await db.query(
            `INSERT INTO envioxpedido (NumeroFacturaPedido, CedulaRepartidor, Direccion, FechaEntrega, Estado) 
             VALUES (:nuevaFactura, :cedulaRepartidor, :direccionIngresada, DATE_ADD(NOW(), INTERVAL 1 MONTH), 'En proceso')`,
            {
                replacements: { nuevaFactura, cedulaRepartidor, direccionIngresada },
                type: db.QueryTypes.INSERT,
                transaction,
            }
        );

        // Confirmar la transacción
        await transaction.commit();
        return nuevaFactura;
    } catch (error) {
        // Revertir la transacción en caso de error
        await transaction.rollback();
        console.error('Error creating pedido:', error);
        throw error;
    }
};



export const obtenerVista = async (vista) => {
    try {
        const resultados = await db.query(`SELECT * FROM ${vista}`, {
            type: db.QueryTypes.SELECT
        });
        return resultados;
    } catch (error) {
        console.error('Error fetching data from view:', error);
        throw error;
    }
};

//Generar pdf
export const getAllViews = async () => {
    try {
        const vistas = await db.query(
            `SELECT table_name 
             FROM information_schema.tables 
             WHERE table_type = 'VIEW' 
             AND table_schema = 'IconicCaps'`,  // Cambia 'IconicCaps' por el nombre de tu esquema
            { type: db.QueryTypes.SELECT }
        );
        return vistas.map(vista => vista.table_name);
    } catch (error) {
        console.error('Error fetching views:', error);
        throw error;
    }
};


export const getCantidadComprasPorProducto = async () => {
    try {
        const resultados = await db.query(
            `SELECT ModeloProducto, SUM(CantidadProducto) AS cantidad_compras
             FROM listaproductospedidos
             GROUP BY ModeloProducto`,
            { type: db.QueryTypes.SELECT }
        );
        return resultados;
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        throw error;
    }
};