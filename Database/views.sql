use iconiccaps;

-- Vista para obtener todos los nombres de los repartidores y su historial de envios
CREATE OR REPLACE VIEW vista_repartidores AS
SELECT CONCAT(Persona.Nombre, ' ', Persona.PrimerApellido, ' ', Persona.SegundoApellido) AS NombreCompleto, Persona.NumeroTelefono,
       Repartidor.NumeroSucursalAsignada, EnvioXPedido.NumeroFacturaPedido, EnvioXPedido.Direccion, EnvioXPedido.FechaEntrega,
       EnvioXPedido.Estado
FROM Repartidor
JOIN EnvioXPedido on Repartidor.CedulaRepartidor = EnvioXPedido.CedulaRepartidor
JOIN Persona on Repartidor.CedulaRepartidor = Persona.Cedula;

SELECT * FROM vista_repartidores;

-- Vista para obtener los clientes y su historial de compras
CREATE OR REPLACE VIEW vista_clientes AS
SELECT CONCAT(Persona.Nombre, ' ', Persona.PrimerApellido, ' ', Persona.SegundoApellido) AS NombreCompleto, Persona.NumeroTelefono,
       Pedido.NumeroFactura, Pedido.FechaDeCompra, ListaProductosPedidos.ModeloProducto, ListaProductosPedidos.CantidadProducto
FROM Cliente
JOIN Persona ON Cliente.CedulaCliente = Persona.Cedula
JOIN Pedido ON Cliente.CedulaCliente = Pedido.CedulaCliente
JOIN ListaProductosPedidos ON Pedido.NumeroFactura = ListaProductosPedidos.NumeroFacturaPedido;

SELECT * FROM vista_clientes;

-- Vista de comentarios, con productos y clientes, es para saber todos los comentarios, los productos (incluyendo la marca) a los que corresponde y quien los hizo
CREATE OR REPLACE VIEW vista_comentarios AS
SELECT Producto.Modelo, Provedor.NombreEmpresa, Comentario.Comentario, Comentario.Estrellas, CONCAT(Persona.Nombre, ' ', Persona.PrimerApellido, ' ', Persona.SegundoApellido) AS NombreCompleto, Comentario.Fecha
FROM Comentario
JOIN Producto on Comentario.ModeloProducto = Producto.Modelo
JOIN Provedor on Producto.IdentificadorFiscalProvedor = Provedor.IdentificadorFiscal
JOIN Persona on Comentario.CedulaCliente = Persona.Cedula;

SELECT * FROM vista_comentarios;

-- Vista para obtener el nombre y numero de telefono de todas las personas asociadas a una sucursal
CREATE OR REPLACE VIEW vista_sucursales AS
SELECT CONCAT(Persona.Nombre, ' ', Persona.PrimerApellido, ' ', Persona.SegundoApellido) AS NombreCompleto, Persona.NumeroTelefono, Persona.Cedula, Sucursal.Nombre AS SucursalAsignada
FROM Sucursal
JOIN Empleado ON Sucursal.NumeroSucursal = Empleado.NumeroSucursalAsignada
JOIN Repartidor ON Sucursal.NumeroSucursal = Repartidor.NumeroSucursalAsignada
JOIN Persona ON Repartidor.CedulaRepartidor AND Empleado.CedulaEmpleado = Persona.Cedula;

SELECT * FROM vista_sucursales;

-- Vista para tener un historial de las garantias (la garantia, la factura asociada y la persona que hizo el pedido)
CREATE OR REPLACE VIEW vista_garantias AS
SELECT Pedido.NumeroFactura, GarantiaXPedido.TipoGarantia, CONCAT(Persona.Nombre, ' ', Persona.PrimerApellido, ' ', Persona.SegundoApellido) AS NombreCompleto, CONCAT(GarantiaXPedido.FechaInicio, '  -  ', GarantiaXPedido.FechaFinal) AS Validez
FROM GarantiaXPedido
JOIN Pedido on GarantiaXPedido.NumeroFacturaPedido = Pedido.NumeroFactura
JOIN Persona ON Pedido.CedulaCliente = Persona.Cedula;

SELECT * FROM vista_garantias;