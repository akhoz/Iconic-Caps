use iconiccaps;

-- Cursor para el reporte de los productos
DELIMITER //
CREATE PROCEDURE reporte_productos()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE modelo_producto VARCHAR (25);
    DECLARE stock_producto INT;
    DECLARE marca_producto VARCHAR(25);

    DECLARE cursor_productos CURSOR FOR
    SELECT Modelo, ExistenciasDisponibles AS Stock, NombreEmpresa AS Marca
    FROM producto
    JOIN provedor ON producto.IdentificadorFiscalProvedor = provedor.IdentificadorFiscal;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    OPEN cursor_productos;
    FETCH cursor_productos INTO modelo_producto, stock_producto, marca_producto;

    WHILE done = 0 DO
        SELECT CONCAT('Producto: ', modelo_producto, ', ', 'Stock: ', stock_producto, ', ', 'Marca: ', marca_producto) AS Reporte_Productos;
        FETCH cursor_productos INTO modelo_producto, stock_producto, marca_producto;
    END WHILE;

    CLOSE cursor_productos;
END //
DELIMITER ;

-- Cursos para ver acciones del cliente (pedidos ha hecho, cuantos productos ha comprado y cuantos ha comentado)
DELIMITER //
CREATE PROCEDURE reporte_clientes()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE usuario_cliente VARCHAR(25);
    DECLARE cantidad_pedidos INT;
    DECLARE cantidad_productos INT;
    DECLARE cantidad_comentarios INT;

    DECLARE cursor_clientes CURSOR FOR
    SELECT usuario,
           (SELECT COUNT(*) FROM pedido WHERE pedido.CedulaCliente = cliente.CedulaCliente) AS cantidad_pedidos,
           (SELECT COUNT(*) FROM listaproductospedidos WHERE listaproductospedidos.NumeroFacturaPedido IN
            (SELECT numeroFactura FROM pedido WHERE pedido.CedulaCliente = cliente.CedulaCliente)) AS cantidad_productos,
           (SELECT COUNT(*) FROM comentario WHERE comentario.CedulaCliente = cliente.CedulaCliente) AS cantidad_comentarios
    FROM cliente;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    OPEN cursor_clientes;
    FETCH cursor_clientes INTO usuario_cliente, cantidad_pedidos, cantidad_productos, cantidad_comentarios;

    WHILE DONE = 0 DO
        SELECT CONCAT('Cliente: ', usuario_cliente, ', ', 'Pedidos realizados: ', cantidad_pedidos, ', ', 'Productos comprados: ', cantidad_productos,
               ', ', 'Cantidad comentarios: ', cantidad_comentarios);
        FETCH cursor_clientes INTO usuario_cliente, cantidad_pedidos, cantidad_productos, cantidad_comentarios;
    END WHILE;

    CLOSE cursor_clientes;
END //
DELIMITER ;

-- Cursor para el reporte de los repartidores, saber cuantos envios tienen pendientes y cuantos han entregado
DELIMITER //
CREATE PROCEDURE reporte_repartidores()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE nombre_repartidor VARCHAR(100);
    DECLARE envios_pendientes INT;
    DECLARE envios_completados INT;

    DECLARE cursor_repartidores CURSOR FOR
    SELECT CONCAT(Nombre, ' ', PrimerApellido, ' ', SegundoApellido) AS repartidor,
        COUNT(CASE WHEN envioxpedido.estado = 'En proceso' THEN 1 ELSE NULL END) AS envios_en_proceso,
        COUNT(CASE WHEN envioxpedido.estado = 'Entregado' THEN 1 ELSE NULL END) AS envios_entregados
    FROM repartidor
    JOIN persona ON repartidor.CedulaRepartidor = persona.Cedula
    JOIN envioxpedido ON repartidor.CedulaRepartidor = envioxpedido.CedulaRepartidor
    GROUP BY repartidor.CedulaRepartidor;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    OPEN cursor_repartidores;
    FETCH cursor_repartidores INTO nombre_repartidor, envios_pendientes, envios_completados;

    WHILE done = 0 DO
        SELECT CONCAT('Repartidor: ', nombre_repartidor, ', ', 'Envios pendientes: ', envios_pendientes, ', ', 'Envios completados: ', envios_completados);
        FETCH cursor_repartidores INTO nombre_repartidor, envios_pendientes, envios_completados;
    END WHILE;
END //
DELIMITER ;