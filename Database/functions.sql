use iconiccaps;

DELIMITER //

CREATE FUNCTION getContrasenaByUsuario(usuario VARCHAR(25)) RETURNS VARCHAR(35)
    READS SQL DATA
BEGIN
    DECLARE contrasena VARCHAR(35);
    SELECT Cliente.Contrasena INTO contrasena FROM Cliente WHERE Cliente.Usuario = usuario;
    RETURN contrasena;
END //

DELIMITER ;

DELIMITER //
CREATE PROCEDURE getInformacionPedidos()
BEGIN
    SELECT NumeroFactura, ModeloProducto, CantidadProducto, Estado, CONCAT(Nombre, ' ', PrimerApellido, ' ', SegundoApellido) AS Repartidor FROM pedido
    JOIN listaproductospedidos ON pedido.NumeroFactura = listaproductospedidos.NumeroFacturaPedido
    JOIN envioxpedido ON pedido.NumeroFactura = envioxpedido.NumeroFacturaPedido
    JOIN repartidor ON envioxpedido.CedulaRepartidor = repartidor.CedulaRepartidor
    JOIN persona ON repartidor.CedulaRepartidor = persona.Cedula;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE getInformacionPedidosByCliente(IN CedulaClienteConsultado INT)
BEGIN
    SELECT NumeroFactura, ModeloProducto, CantidadProducto, Estado, FechaDeCompra, CONCAT(Nombre, ' ', PrimerApellido, ' ', SegundoApellido) AS Repartidor FROM pedido
    JOIN listaproductospedidos ON pedido.NumeroFactura = listaproductospedidos.NumeroFacturaPedido
    JOIN envioxpedido ON pedido.NumeroFactura = envioxpedido.NumeroFacturaPedido
    JOIN repartidor ON envioxpedido.CedulaRepartidor = repartidor.CedulaRepartidor
    JOIN persona ON repartidor.CedulaRepartidor = persona.Cedula
    WHERE pedido.CedulaCliente = CedulaClienteConsultado;

END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE getProductosCompradosByCliente(IN CedulaClienteConsultado INT)
BEGIN
    SELECT ModeloProducto FROM cliente
    JOIN pedido ON cliente.CedulaCliente = pedido.CedulaCliente
    JOIN listaproductospedidos ON pedido.NumeroFactura = listaproductospedidos.NumeroFacturaPedido
    WHERE cliente.CedulaCliente = CedulaClienteConsultado;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE crearPedido(IN CedulaClienteSolicitante INT, IN porcentajeGarantia INT, IN direccionIngresada VARCHAR(25))
BEGIN
    DECLARE nueva_factura INT;
    DECLARE cedula_repatidor INT;

    SELECT CedulaRepartidor INTO cedula_repatidor
    FROM repartidor
    ORDER BY RAND()
    LIMIT 1;

    INSERT INTO pedido (CedulaCliente, FechaDeCompra) VALUE
        (CedulaClienteSolicitante, NOW());

    SELECT NumeroFactura INTO nueva_factura
    FROM pedido
    ORDER BY NumeroFactura desc
    LIMIT 1;

    INSERT INTO garantiaxpedido (NumeroFacturaPedido, FechaInicio, FechaFinal, TipoGarantia) VALUE
        (nueva_factura, NOW(), DATE_ADD(NOW(), INTERVAL 1 YEAR), porcentajeGarantia);

    INSERT INTO envioxpedido (NumeroFacturaPedido, CedulaRepartidor, Direccion, FechaEntrega, Estado) VALUE
        (nueva_factura, cedula_repatidor, direccionIngresada, DATE_ADD(NOW(), INTERVAL 1 MONTH), 'En proceso');

END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE procesarProductosPedidos(IN numero_factura INT, IN modelo_producto VARCHAR(25), IN cantidad_solicitada INT)
BEGIN
    INSERT INTO listaproductospedidos (NumeroFacturaPedido, ModeloProducto, CantidadProducto) VALUE
        (numero_factura, modelo_producto, cantidad_solicitada);
END //
DELIMITER  ;

DELIMITER //
CREATE PROCEDURE veces_comprado()
BEGIN
    SELECT ModeloProducto, SUM(CantidadProducto) AS cantidad_compras
    FROM listaproductospedidos
    GROUP BY ModeloProducto;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE pedidos_pendientes()
BEGIN
    SELECT
        pedido.NumeroFactura,
        pedido.FechaDeCompra,
        CONCAT(c.Nombre, ' ', c.PrimerApellido, ' ', c.SegundoApellido) AS NombreCliente,
        CONCAT(r.Nombre, ' ', r.PrimerApellido, ' ', r.SegundoApellido) AS NombreRepartidor
    FROM pedido
    JOIN envioxpedido ON pedido.NumeroFactura = envioxpedido.NumeroFacturaPedido
    JOIN repartidor ON envioxpedido.CedulaRepartidor = repartidor.CedulaRepartidor
    JOIN cliente ON pedido.CedulaCliente = cliente.CedulaCliente
    JOIN persona AS c ON cliente.CedulaCliente = c.Cedula
    JOIN persona AS r ON repartidor.CedulaRepartidor = r.Cedula
    WHERE envioxpedido.Estado = 'En proceso';
END //
DELIMITER ;

-- Procedimientos de modificacion e insertar

DELIMITER //
CREATE PROCEDURE modificarProducto(IN modelo_producto VARCHAR(25), IN nuevo_precio INT, IN nueva_existencia INT, IN categoria_producto VARCHAR(25), IN nueva_marca INT)
BEGIN
    UPDATE producto
    SET Precio = nuevo_precio, ExistenciasDisponibles = nueva_existencia, IdentificadorFiscalProvedor = nueva_marca,
        Categoria = categoria_producto
    WHERE Modelo = modelo_producto;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE insertarProducto(IN modelo_producto VARCHAR(25), IN precio_producto INT, IN existencias_producto INT, IN categoria_producto VARCHAR(25), IN marca_producto INT)
BEGIN
    INSERT INTO producto (Modelo, Precio, ExistenciasDisponibles, IdentificadorFiscalProvedor, Categoria) VALUE
        (modelo_producto, precio_producto, existencias_producto, marca_producto, categoria_producto);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE eliminarProducto(IN modelo_producto VARCHAR(25))
BEGIN
    DELETE FROM producto
    WHERE Modelo = modelo_producto;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE insertarComentario(IN cedula_cliente INT, IN modelo_producto VARCHAR(25), IN estrellas_producto INT, IN comentario_producto VARCHAR(250), IN fecha_comentario DATE, IN hora_comentario VARCHAR(5))
BEGIN
    INSERT INTO comentario (CedulaCliente, ModeloProducto, Estrellas, Comentario, Fecha, Hora) VALUE
        (cedula_cliente, modelo_producto, estrellas_producto, comentario_producto, fecha_comentario, hora_comentario);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE modificarComentario(IN cedula_cliente INT, IN modelo_producto VARCHAR(25), IN estrellas_producto INT, IN comentario_producto VARCHAR(250), IN fecha_comentario DATE, IN hora_comentario VARCHAR(5))
BEGIN
    UPDATE comentario
    SET Estrellas = estrellas_producto, Comentario = comentario_producto, Fecha = fecha_comentario, Hora = hora_comentario
    WHERE CedulaCliente = cedula_cliente AND ModeloProducto = modelo_producto;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE eliminarComentario(IN cedula_cliente INT, IN modelo_producto VARCHAR(25))
BEGIN
    DELETE FROM comentario
    WHERE CedulaCliente = cedula_cliente AND ModeloProducto = modelo_producto;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE insertarCliente(IN cedula_cliente INT, IN usuario_cliente VARCHAR(25), IN contrasena_cliente VARCHAR(35), IN nombre_cliente VARCHAR(25), IN primer_apellido_cliente VARCHAR(25), IN segundo_apellido_cliente VARCHAR(25), IN email_cliente VARCHAR(25))
BEGIN
    INSERT INTO cliente (CedulaCliente, Usuario, Contrasena) VALUE
        (cedula_cliente, usuario_cliente, contrasena_cliente);
    INSERT INTO persona (Cedula, Nombre, PrimerApellido, SegundoApellido, Email) VALUE
        (cedula_cliente, nombre_cliente, primer_apellido_cliente, segundo_apellido_cliente, email_cliente);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE modificarCliente(IN cedula_cliente INT, IN usuario_cliente VARCHAR(25), IN contrasena_cliente VARCHAR(35))
BEGIN
    UPDATE cliente
    SET Usuario = usuario_cliente, Contrasena = contrasena_cliente
    WHERE CedulaCliente = cedula_cliente;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE eliminarCliente(IN cedula_cliente INT)
BEGIN
    DELETE FROM cliente
    WHERE CedulaCliente = cedula_cliente;
    DELETE FROM persona
    WHERE Cedula = cedula_cliente;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE insertarEmpleado(IN cedula_empleado INT, IN numero_sucursal INT, IN nombre_empleado VARCHAR(25), IN primer_apellido_empleado VARCHAR(25), IN segundo_apellido_empleado VARCHAR(25), IN email_empleado VARCHAR(25))
BEGIN
    INSERT INTO empleado (CedulaEmpleado, NumeroSucursalAsignada) VALUE
        (cedula_empleado, numero_sucursal);
    INSERT INTO persona (Cedula, Nombre, PrimerApellido, SegundoApellido, Email) VALUE
        (cedula_empleado, nombre_empleado, primer_apellido_empleado, segundo_apellido_empleado, email_empleado);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE modificarEmpleado(IN cedula_empleado INT, IN numero_sucursal INT)
BEGIN
    UPDATE empleado
    SET NumeroSucursalAsignada = numero_sucursal
    WHERE CedulaEmpleado = cedula_empleado;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE eliminarEmpleado(IN cedula_empleado INT)
BEGIN
    DELETE FROM empleado
    WHERE CedulaEmpleado = cedula_empleado;
    DELETE FROM persona
    WHERE Cedula = cedula_empleado;
END //

DELIMITER //
CREATE PROCEDURE insertarRepartidor(IN cedula_repartidor INT, IN numero_sucursal INT, IN nombre_repartidor VARCHAR(25), IN primer_apellido_repartidor VARCHAR(25), IN segundo_apellido_repartidor VARCHAR(25), IN email_repartidor VARCHAR(25))
BEGIN
    INSERT INTO repartidor (CedulaRepartidor, NumeroSucursalAsignada) VALUE
        (cedula_repartidor, numero_sucursal);
    INSERT INTO persona (Cedula, Nombre, PrimerApellido, SegundoApellido, Email) VALUE
        (cedula_repartidor, nombre_repartidor, primer_apellido_repartidor, segundo_apellido_repartidor, email_repartidor);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE modificarRepartidor(IN cedula_repartidor INT, IN numero_sucursal INT)
BEGIN
    UPDATE repartidor
    SET NumeroSucursalAsignada = numero_sucursal
    WHERE CedulaRepartidor = cedula_repartidor;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE eliminarRepartidor(IN cedula_repartidor INT)
BEGIN
    DELETE FROM repartidor
    WHERE CedulaRepartidor = cedula_repartidor;
    DELETE FROM persona
    WHERE Cedula = cedula_repartidor;
END //

DELIMITER //
CREATE PROCEDURE insertarSucursal(IN numero_sucursal INT, IN nombre_sucursal VARCHAR(25), IN direccion_sucursal VARCHAR(255), IN numero_telefono_sucursal VARCHAR(25))
BEGIN
    INSERT INTO sucursal (NumeroSucursal, Nombre, Direccion, NumeroTelefono) VALUE
        (numero_sucursal, nombre_sucursal, direccion_sucursal, numero_telefono_sucursal);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE modificarSucursal(IN numero_sucursal INT, IN nombre_sucursal VARCHAR(25), IN direccion_sucursal VARCHAR(255), IN numero_telefono_sucursal VARCHAR(25))
BEGIN
    UPDATE sucursal
    SET Nombre = nombre_sucursal, Direccion = direccion_sucursal, NumeroTelefono = numero_telefono_sucursal
    WHERE NumeroSucursal = numero_sucursal;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE eliminarSucursal(IN numero_sucursal INT)
BEGIN
    DELETE FROM sucursal
    WHERE NumeroSucursal = numero_sucursal;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE insertarMarca(IN identificador_fiscal INT, IN direccion_empresa VARCHAR(255), IN correo VARCHAR(25))
BEGIN
    INSERT INTO provedor (IdentificadorFiscal, NombreEmpresa, CorreoElectronico) VALUE
        (identificador_fiscal, direccion_empresa, correo);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE modificarMarca(IN identificador_fiscal INT,IN nombre_empresa VARCHAR(25), IN correo VARCHAR(25))
BEGIN
    UPDATE provedor
    SET NombreEmpresa = nombre_empresa, CorreoElectronico = correo
    WHERE IdentificadorFiscal = identificador_fiscal;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE eliminarMarca(IN identificador_fiscal INT)
BEGIN
    DELETE FROM provedor
    WHERE IdentificadorFiscal = identificador_fiscal;
END //

DELIMITER //
CREATE PROCEDURE insertarPersona(IN cedula_persona INT, IN nombre_persona VARCHAR(25), IN primer_apellido_persona VARCHAR(25), IN segundo_apellido_persona VARCHAR(25), IN email_persona VARCHAR(25))
BEGIN
    INSERT INTO persona (Cedula, Nombre, PrimerApellido, SegundoApellido, Email) VALUE
        (cedula_persona, nombre_persona, primer_apellido_persona, segundo_apellido_persona, email_persona);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE modificarPersona(IN cedula_persona INT, IN nombre_persona VARCHAR(25), IN primer_apellido_persona VARCHAR(25), IN segundo_apellido_persona VARCHAR(25), IN email_persona VARCHAR(25))
BEGIN
    UPDATE persona
    SET Nombre = nombre_persona, PrimerApellido = primer_apellido_persona, SegundoApellido = segundo_apellido_persona, Email = email_persona
    WHERE Cedula = cedula_persona;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE eliminarPersona(IN cedula_persona INT)
BEGIN
    DELETE FROM persona
    WHERE Cedula = cedula_persona;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE insertarEnvio(IN numero_factura_pedido INT, IN cedula_repartidor INT, IN direccion_envio VARCHAR(25), IN fecha_entrega DATE, IN estado_envio VARCHAR(25))
BEGIN
    INSERT INTO envioxpedido (NumeroFacturaPedido, CedulaRepartidor, Direccion, FechaEntrega, Estado) VALUE
        (numero_factura_pedido, cedula_repartidor, direccion_envio, fecha_entrega, estado_envio);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE modificarEnvio(IN numero_factura_pedido INT, IN cedula_repartidor INT, IN direccion_envio VARCHAR(25), IN fecha_entrega DATE, IN estado_envio VARCHAR(25))
BEGIN
    UPDATE envioxpedido
    SET CedulaRepartidor = cedula_repartidor, Direccion = direccion_envio, FechaEntrega = fecha_entrega, Estado = estado_envio
    WHERE NumeroFacturaPedido = numero_factura_pedido;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE eliminarEnvio(IN numero_factura_pedido INT)
BEGIN
    DELETE FROM envioxpedido
    WHERE NumeroFacturaPedido = numero_factura_pedido;
END //

DELIMITER //
CREATE PROCEDURE insertarGarantia(IN numero_factura_pedido INT, IN fecha_inicio DATE, IN fecha_final DATE, IN tipo_garantia VARCHAR(25))
BEGIN
    INSERT INTO garantiaxpedido (NumeroFacturaPedido, FechaInicio, FechaFinal, TipoGarantia) VALUE
        (numero_factura_pedido, fecha_inicio, fecha_final, tipo_garantia);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE modificarGarantia(IN numero_factura_pedido INT, IN fecha_inicio DATE, IN fecha_final DATE, IN tipo_garantia VARCHAR(25))
BEGIN
    UPDATE garantiaxpedido
    SET FechaInicio = fecha_inicio, FechaFinal = fecha_final, TipoGarantia = tipo_garantia
    WHERE NumeroFacturaPedido = numero_factura_pedido;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE eliminarGarantia(IN numero_factura_pedido INT)
BEGIN
    DELETE FROM garantiaxpedido
    WHERE NumeroFacturaPedido = numero_factura_pedido;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE insertarPedido(IN numero_factura INT, IN cedula_cliente INT)
BEGIN
    INSERT INTO pedido (NumeroFactura, CedulaCliente, FechaDeCompra) VALUE
        (numero_factura, cedula_cliente, now());
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE modificarPedido(IN numero_factura INT, IN cedula_cliente INT)
BEGIN
    UPDATE pedido
    SET CedulaCliente = cedula_cliente
    WHERE NumeroFactura = numero_factura;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE eliminarPedido(IN numero_factura INT)
BEGIN
    DELETE FROM pedido
    WHERE NumeroFactura = numero_factura;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE insertarProductoPedido(IN numero_factura_pedido INT, IN modelo_producto VARCHAR(25), IN cantidad_producto INT)
BEGIN
    INSERT INTO listaproductospedidos (NumeroFacturaPedido, ModeloProducto, CantidadProducto) VALUE
        (numero_factura_pedido, modelo_producto, cantidad_producto);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE modificarProductoPedido(IN numero_factura_pedido INT, IN modelo_producto VARCHAR(25), IN cantidad_producto INT)
BEGIN
    UPDATE listaproductospedidos
    SET CantidadProducto = cantidad_producto
    WHERE NumeroFacturaPedido = numero_factura_pedido AND ModeloProducto = modelo_producto;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE eliminarProductoPedido(IN numero_factura_pedido INT, IN modelo_producto VARCHAR(25))
BEGIN
    DELETE FROM listaproductospedidos
    WHERE NumeroFacturaPedido = numero_factura_pedido AND ModeloProducto = modelo_producto;
END //
DELIMITER ;