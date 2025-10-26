import db from './database/db.js';

export const getInformacionPedidosByCliente = async (CedulaClienteConsultado) => {
  const query = `
    SELECT 
      Pedido.NumeroFactura,
      ListaProductosPedidos.ModeloProducto,
      ListaProductosPedidos.CantidadProducto,
      EnvioXPedido.Estado,
      Pedido.FechaDeCompra,
      CONCAT(Persona.Nombre, ' ', Persona.PrimerApellido, ' ', Persona.SegundoApellido) AS Repartidor
    FROM Pedido
    JOIN ListaProductosPedidos 
      ON Pedido.NumeroFactura = ListaProductosPedidos.NumeroFacturaPedido
    JOIN EnvioXPedido 
      ON Pedido.NumeroFactura = EnvioXPedido.NumeroFacturaPedido
    JOIN Repartidor 
      ON EnvioXPedido.CedulaRepartidor = Repartidor.CedulaRepartidor
    JOIN Persona 
      ON Repartidor.CedulaRepartidor = Persona.Cedula
    WHERE Pedido.CedulaCliente = :CedulaClienteConsultado;
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
    SELECT LP.ModeloProducto
    FROM Cliente C
    JOIN Pedido P ON C.CedulaCliente = P.CedulaCliente
    JOIN ListaProductosPedidos LP ON P.NumeroFactura = LP.NumeroFacturaPedido
    WHERE C.CedulaCliente = :CedulaClienteConsultado;
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

// Este metodo fue modificado, ya no guarda la gatantia, la pone en 0
// para que luego el trigger la calcle bien
export const crearPedido = async (CedulaClienteSolicitante, _porcentajeGarantia, direccionIngresada) => {
  const transaction = await db.transaction();
  try {
    const [repartidor] = await db.query(
      `SELECT CedulaRepartidor FROM Repartidor ORDER BY RAND() LIMIT 1`,
      { type: db.QueryTypes.SELECT, transaction }
    );
    if (!repartidor) throw new Error('No hay repartidores disponibles');

    await db.query(
      `INSERT INTO Pedido (CedulaCliente, FechaDeCompra)
       VALUES (:CedulaClienteSolicitante, NOW())`,
      {
        replacements: { CedulaClienteSolicitante },
        type: db.QueryTypes.INSERT,
        transaction,
      }
    );

    const [{ NumeroFactura }] = await db.query(
      `SELECT LAST_INSERT_ID() AS NumeroFactura`,
      { type: db.QueryTypes.SELECT, transaction }
    );

    await db.query(
      `INSERT INTO GarantiaXPedido (NumeroFacturaPedido, FechaInicio, FechaFinal, TipoGarantia)
       VALUES (:NumeroFactura, NOW(), DATE_ADD(NOW(), INTERVAL 1 YEAR), :garantia)`,
      {
        replacements: { NumeroFactura, garantia: '0.00' },
        type: db.QueryTypes.INSERT,
        transaction,
      }
    );

    await db.query(
      `INSERT INTO EnvioXPedido (NumeroFacturaPedido, CedulaRepartidor, Direccion, FechaEntrega, Estado)
       VALUES (:NumeroFactura, :cedulaRepartidor, :direccionIngresada, DATE_ADD(NOW(), INTERVAL 1 MONTH), 'En proceso')`,
      {
        replacements: {
          NumeroFactura,
          cedulaRepartidor: repartidor.CedulaRepartidor,
          direccionIngresada
        },
        type: db.QueryTypes.INSERT,
        transaction,
      }
    );

    await transaction.commit();
    return NumeroFactura;
  } catch (error) {
    await transaction.rollback();
    console.error('Error creating pedido:', error);
    throw error;
  }
};


export const obtenerVista = async (vista) => {
  try {
    if (!/^[A-Za-z0-9_]+$/.test(vista)) {
      throw new Error('Nombre de vista inválido');
    }

    const exists = await db.query(
      `
      SELECT TABLE_NAME
      FROM information_schema.VIEWS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :vista
      `,
      {
        replacements: { vista },
        type: db.QueryTypes.SELECT,
      }
    );

    if (exists.length === 0) {
      throw new Error(`La vista '${vista}' no existe en el esquema actual.`);
    }

    const resultados = await db.query(`SELECT * FROM \`${vista}\``, {
      type: db.QueryTypes.SELECT,
    });
    return resultados;
  } catch (error) {
    console.error('Error fetching data from view:', error);
    throw error;
  }
};

export const getAllViews = async () => {
  try {
    const resultados = await db.query(
      `
      SELECT TABLE_NAME
      FROM information_schema.VIEWS
      WHERE TABLE_SCHEMA = DATABASE()
      ORDER BY TABLE_NAME
      `,
      { type: db.QueryTypes.SELECT }
    );

    return resultados.map(v => v.TABLE_NAME);
  } catch (error) {
    console.error('Error fetching views:', error);
    throw error;
  }
};

export const getCantidadComprasPorProducto = async () => {
  try {
    const resultados = await db.query(
      `
      SELECT ModeloProducto, SUM(CantidadProducto) AS cantidad_compras
      FROM ListaProductosPedidos
      GROUP BY ModeloProducto
      ORDER BY cantidad_compras DESC, ModeloProducto ASC
      `,
      { type: db.QueryTypes.SELECT }
    );
    return resultados;
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    throw error;
  }
};

export const getPedidosPendientes = async () => {
  try {
    const resultados = await db.query(
      `
      SELECT
        P.NumeroFactura,
        P.FechaDeCompra,
        CONCAT(PC.Nombre, ' ', PC.PrimerApellido, ' ', PC.SegundoApellido) AS NombreCliente,
        CONCAT(PR.Nombre, ' ', PR.PrimerApellido, ' ', PR.SegundoApellido) AS NombreRepartidor
      FROM Pedido P
      JOIN EnvioXPedido EX ON P.NumeroFactura = EX.NumeroFacturaPedido
      JOIN Repartidor R ON EX.CedulaRepartidor = R.CedulaRepartidor
      JOIN Cliente C ON P.CedulaCliente = C.CedulaCliente
      JOIN Persona PC ON C.CedulaCliente = PC.Cedula
      JOIN Persona PR ON R.CedulaRepartidor = PR.Cedula
      WHERE EX.Estado = 'En proceso'
      ORDER BY P.FechaDeCompra DESC, P.NumeroFactura DESC;
      `,
      { type: db.QueryTypes.SELECT }
    );
    return resultados;
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    throw error;
  }
};
