create database IconicCaps;

-- Creacion de usuarios para el segundo proyecto
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin123';
GRANT ALL PRIVILEGES ON IconicCaps.* TO 'admin'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;

CREATE USER 'normal'@'localhost' IDENTIFIED BY 'tablas_funciones123';
GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE ON IconicCaps.* TO 'normal'@'localhost';
FLUSH PRIVILEGES;

CREATE USER 'respaldo'@'localhost' IDENTIFIED BY 'respaldos123';
GRANT EVENT, RELOAD, LOCK TABLES, SELECT ON IconicCaps.* TO 'respaldo'@'localhost';
FLUSH PRIVILEGES;




create table IconicCaps.Provedor (
    IdentificadorFiscal INT PRIMARY KEY,
    NombreEmpresa VARCHAR(25) NOT NULL,
    CorreoElectronico VARCHAR(25) NOT NULL
);

create table IconicCaps.Producto (
    Modelo VARCHAR(25) PRIMARY KEY,
    IdentificadorFiscalProvedor INT NOT NULL,
    FOREIGN KEY (IdentificadorFiscalProvedor) references Provedor (IdentificadorFiscal),
    Categoria VARCHAR(25) NOT NULL,
    Precio INT NOT NULL,
    ExistenciasDisponibles INT NOT NULL
);

create table IconicCaps.Sucursal (
    NumeroSucursal INT PRIMARY KEY,
    Nombre VARCHAR(25) NOT NULL,
    Direccion VARCHAR(25) NOT NULL,
    NumeroTelefono VARCHAR(25) NOT NULL
);

create table IconicCaps.Persona (
    Cedula INT PRIMARY KEY,
    Nombre VARCHAR(25) NOT NULL,
    PrimerApellido VARCHAR(25) NOT NULL,
    SegundoApellido VARCHAR(25) NOT NULL,
    NumeroTelefono VARCHAR(25) NOT NULL
);

create table IconicCaps.Cliente (
    CedulaCliente INT PRIMARY KEY,
    Usuario VARCHAR(25) NOT NULL,
    Contrasena VARCHAR(25) NOT NULL,
    UltimoIngreso VARCHAR(25) NOT NULL,
    FOREIGN KEY (CedulaCliente) references Persona (Cedula)
);

create table IconicCaps.Empleado (
    CedulaEmpleado INT PRIMARY KEY,
    NumeroSucursalAsignada INT,
    FOREIGN KEY (CedulaEmpleado) references Persona (Cedula),
    FOREIGN KEY (NumeroSucursalAsignada) references Sucursal (NumeroSucursal)
);

create table IconicCaps.Repartidor (
    CedulaRepartidor INT PRIMARY KEY,
    NumeroSucursalAsignada INT,
    FOREIGN KEY (CedulaRepartidor) references Persona (Cedula),
    FOREIGN KEY (NumeroSucursalAsignada) references Sucursal (NumeroSucursal)
);

create table IconicCaps.Compra (
    IdCompra INT AUTO_INCREMENT,
    ModeloProducto VARCHAR(25),
    CedulaCliente INT,
    FOREIGN KEY (ModeloProducto) references Producto (Modelo),
    FOREIGN KEY (CedulaCliente) references Cliente (CedulaCliente),
    PRIMARY KEY (IdCompra, ModeloProducto, CedulaCliente)
);

create table IconicCaps.Comentario (
    IdComentario INT PRIMARY KEY,
    CedulaCliente INT,
    ModeloProducto VARCHAR(25),
    Estrellas INT NOT NULL,
    Comentario VARCHAR(25) NOT NULL,
    Fecha VARCHAR(25) NOT NULL,
    Hora VARCHAR(25) NOT NULL,
    FOREIGN KEY (CedulaCliente) references Cliente (CedulaCliente),
    FOREIGN KEY (ModeloProducto) references Producto (Modelo)
);

create table IconicCaps.Pedido (
    NumeroFactura INT PRIMARY KEY,
    CedulaCliente INT,
    FechaDeCompra VARCHAR(25) NOT NULL,
    HoraDeCompra VARCHAR(25) NOT NULL,
    Estado VARCHAR(25) NOT NULL,
    FOREIGN KEY (CedulaCliente) references Cliente (CedulaCliente)
);

create table IconicCaps.ListaProductosPedidos (
    NumeroFacturaPedido INT,
    ModeloProducto VARCHAR(25),
    CantidadProducto INT,
    FOREIGN KEY (NumeroFacturaPedido) references Pedido (NumeroFactura),
    FOREIGN KEY (ModeloProducto) references Producto (Modelo),
    PRIMARY KEY (NumeroFacturaPedido, ModeloProducto)
);


create table IconicCaps.GarantiaXPedido (
    NumeroFacturaPedido INT PRIMARY KEY,
    FechaInicio VARCHAR(25) NOT NULL,
    FechaFinal VARCHAR(25) NOT NULL,
    TipoGarantia VARCHAR(25) NOT NULL,
    FOREIGN KEY (NumeroFacturaPedido) references Pedido (NumeroFactura)
);


create table IconicCaps.EnvioXPedido (
    NumeroFacturaPedido INT PRIMARY KEY,
    CedulaRepartidor INT,
    Direccion VARCHAR(25) NOT NULL,
    FechaEntrega VARCHAR(25) NOT NULL,
    HoraEntrega VARCHAR(25) NOT NULL,
    Estado VARCHAR(25) NOT NULL,
    FOREIGN KEY (NumeroFacturaPedido) references Pedido (NumeroFactura),
    FOREIGN KEY (CedulaRepartidor) references Repartidor (CedulaRepartidor)
);

insert into IconicCaps.Provedor (IdentificadorFiscal, NombreEmpresa, CorreoElectronico) values
    (98, 'Nike', 'nike@store.com'),
    (76, 'Adidas', 'adidas@store.com'),
    (69, 'Puma', 'puma@store.com'),
    (11, 'UnderArmour', 'underarmour@store.com'),
    (54, 'Everlast', 'everlast@store.com'),
    (34, 'GAP', 'gap@factory.com');

insert into IconicCaps.Producto (Modelo, IdentificadorFiscalProvedor, Categoria, Precio, ExistenciasDisponibles) values
    ('NR2', 98, 'Deportiva', 100, 5),
    ('AD5', 76, 'Deportiva', 80, 7),
    ('PM12', 69, 'Deportiva', 60, 3),
    ('UA34', 11, 'Deportiva', 110, 9),
    ('EL2', 54, 'Deportiva', 76, 4),
    ('GP6', 34, 'Casual', 100, 5);

insert into IconicCaps.Sucursal (NumeroSucursal, Nombre, Direccion, NumeroTelefono) values
    (1, 'Iconic San Carlos', 'El Encuentro', '+506 24011111'),
    (2, 'Iconic San Ramon', 'En el Mall', '+506 24452222'),
    (3, 'Iconic Los Chiles', 'Casa de Ram', '+506 24713333'),
    (4, 'Iconic Puntarenas', 'Esparza', '+506 24461111'),
    (5, 'Iconic California', 'Close to the Golden Gate', '+1 279-7937'),
    (6, 'Iconic New York', 'Central Park', '+1 279-9232');

insert into IconicCaps.Persona (Cedula, Nombre, PrimerApellido, SegundoApellido, NumeroTelefono) values
    (208700187, 'Hector', 'Caravaca', 'Vargas', '+506 89757650'),
    (208700188, 'Juan', 'Ramirez', 'Alvarez', '+506 89757651'),
    (208700189, 'Pedro', 'Gonzalez', 'Lopez', '+506 89757652'),
    (208700190, 'Maria', 'Martinez', 'Perez', '+506 89757653'),
    (208700191, 'Ana', 'Hernandez', 'Gutierrez', '+506 89757654'),
    (208700192, 'Luis', 'Diaz', 'Fernandez', '+506 89757655'),
    (208700193, 'Carlos', 'Sanchez', 'Rodriguez', '+506 89757656'),
    (208700194, 'Sofia', 'Lopez', 'Garcia', '+506 89757657'),
    (208700195, 'Elena', 'Torres', 'Vazquez', '+506 89757658'),
    (208700196, 'Pablo', 'Gomez', 'Sanchez', '+506 89757659'),
    (208700197, 'Laura', 'Martin', 'Gonzalez', '+506 89757660'),
    (208700198, 'Javier', 'Rodriguez', 'Diaz', '+506 89757661'),
    (208700199, 'Daniela', 'Perez', 'Martinez', '+506 89757662'),
    (208700200, 'Alejandro', 'Gutierrez', 'Hernandez', '+506 89757663'),
    (208700201, 'Fernande', 'Fernandez', 'Lopez', '+506 89757664'),
    (208700202, 'Roberto', 'Vazquez', 'Torres', '+506 89757665'),
    (208700203, 'Carmen', 'Sanchez', 'Gomez', '+506 89757666'),
    (208700204, 'Diego', 'Garcia', 'Martin', '+506 89757667');

insert into IconicCaps.Cliente (CedulaCliente, Usuario, Contrasena, UltimoIngreso) values
    (208700187, 'HectorPro69', 'GatoSalvaje111', '4/2/2024'),
    (208700188, 'Juan13', 'Goku12', '2/2/2024'),
    (208700189, 'PedroCrack', 'Vegeta777', '4/1/2024'),
    (208700190, 'MariaDB', 'MejorQueMySQL', '10/2/2024'),
    (208700191, 'Ana2', 'Ana123', '5/2/2024'),
    (208700192, 'Lusito', 'Comunica', '1/2/2024');

insert into IconicCaps.Empleado (CedulaEmpleado, NumeroSucursalAsignada) values
    (208700193, 1),
    (208700194, 2),
    (208700195, 3),
    (208700196, 4),
    (208700197, 5),
    (208700198, 6);

insert into IconicCaps.Repartidor (CedulaRepartidor, NumeroSucursalAsignada) values
    (208700199, 1),
    (208700200, 2),
    (208700201, 3),
    (208700202, 4),
    (208700203, 5),
    (208700204, 6);

insert into IconicCaps.Compra (ModeloProducto, CedulaCliente) values
    ('AD5', 208700187),
    ('EL2', 208700188),
    ('GP6', 208700189),
    ('NR2', 208700190),
    ('PM12', 208700191),
    ('UA34', 208700192);

insert into IconicCaps.Comentario (IdComentario, CedulaCliente, ModeloProducto, Estrellas, Comentario, Fecha, Hora) values
    (1, 208700187, 'AD5', 4, 'Me gusto', '4/2/2024', '10:00'),
    (2, 208700188, 'EL2', 4, 'Me encanto', '5/2/2024', '11:00'),
    (3, 208700189, 'GP6', 4, 'Me gusto mucho', '6/2/2024', '12:00'),
    (4, 208700190, 'NR2', 4, 'No me gusto', '7/2/2024', '13:00'),
    (5, 208700191, 'PM12', 4, 'Mal', '8/2/2024', '14:00'),
    (6, 208700192, 'UA34', 4, 'Malarda', '9/2/2024', '15:00');

insert into IconicCaps.Pedido (NumeroFactura, CedulaCliente, FechaDeCompra, HoraDeCompra, Estado) values
    (123, 208700187, '3/1/2024', '09:00', 'Recogido'),
    (124, 208700188, '4/1/2024', '10:00', 'Recogido'),
    (125, 208700189, '5/1/2024', '11:00', 'Recogido'),
    (126, 208700190, '6/1/2024', '12:00', 'Recogido'),
    (127, 208700191, '7/1/2024', '13:00', 'Recogido'),
    (128, 208700192, '8/1/2024', '14:00', 'Recogido');

insert into IconicCaps.ListaProductosPedidos (NumeroFacturaPedido, ModeloProducto, CantidadProducto) values
    (123, 'AD5', 3),
    (124, 'EL2', 2),
    (125, 'GP6', 1),
    (126, 'NR2', 5),
    (127, 'PM12', 6),
    (128, 'UA34', 7);

insert into IconicCaps.GarantiaXPedido (NumeroFacturaPedido, FechaInicio, FechaFinal, TipoGarantia) values
    (123, '3/1/2024', '3/1/2025', 'Total'),
    (124, '4/1/2024', '4/1/2029', '70%'),
    (125, '5/1/2024', '5/1/2025', 'Total'),
    (126, '6/1/2024', '6/1/2026', 'Total'),
    (127, '7/1/2024', '7/1/2027', '50%'),
    (128, '8/1/2024', '8/1/2025', 'Total');

insert into IconicCaps.EnvioXPedido (NumeroFacturaPedido, CedulaRepartidor, Direccion, FechaEntrega, HoraEntrega, Estado) values
    (123, 208700199, 'Chachagua', '3/2/2024', '13:00', 'Perdido'),
    (124, 208700200, 'San Ramon', '4/2/2024', '14:00', 'Entregado'),
    (125, 208700201, 'San Pedro', '5/2/2024', '15:00', 'Retenido por FBI'),
    (126, 208700202, 'San Jose', '6/2/2024', '16:00', 'En proceso'),
    (127, 208700203, 'Alajuela', '7/2/2024', '17:00', 'En proceso'),
    (128, 208700204, 'Alaska', '8/2/2024', '18:00', 'Entregado');

insert into IconicCaps.ListaProductosPedidos (NumeroFacturaPedido, ModeloProducto, CantidadProducto) values
    (123, 'EL2', 1);

insert into IconicCaps.Producto values
    ('NR34', 98, 'Casual', 200, 5);

use IconicCaps;

--  Consultar el cliente que pidio un pedido a partir del numero de factura
select Cliente.*
from Cliente
inner join Pedido on Cliente.CedulaCliente = Pedido.CedulaCliente
where Pedido.NumeroFactura = 127;

-- Ahora, con la cedula del cliente, consultar los productos que ha pedido
select ListaProductosPedidos.ModeloProducto, ListaProductosPedidos.CantidadProducto
from Pedido
inner join ListaProductosPedidos on Pedido.NumeroFactura = ListaProductosPedidos.NumeroFacturaPedido
inner join Cliente on Pedido.CedulaCliente = Cliente.CedulaCliente
where Cliente.CedulaCliente = 208700187;

-- Ver el estado del envio de un pedido y quien lo esta enviando a partir del usuario del numero de factura del pedido
select Persona.Nombre, Persona.PrimerApellido, Persona.SegundoApellido, EnvioXPedido.Estado
from Pedido
inner join EnvioXPedido on Pedido.NumeroFactura = EnvioXPedido.NumeroFacturaPedido
inner join Repartidor on EnvioXPedido.CedulaRepartidor = Repartidor.CedulaRepartidor
inner join Persona on Repartidor.CedulaRepartidor = Persona.Cedula
where Pedido.NumeroFactura = 126;

-- Consultar quien es el distribuidor de una gorra en especifico a partir de su modelo
select Provedor.NombreEmpresa
from Producto
inner join Provedor on Producto.IdentificadorFiscalProvedor = Provedor.IdentificadorFiscal
where Producto.Modelo = 'AD5';

select Producto.modelo
from Producto
where Producto.IdentificadorFiscalProvedor = 98;

select Comentario.comentario
from Comentario
where Comentario.ModeloProducto = 'UA34';

-- Consultar la cedula de todos los empleados asociados a una sucursal a partir del nombre de esta
select Empleado.CedulaEmpleado
from Sucursal
inner join Empleado on Sucursal.NumeroSucursal = Empleado.NumeroSucursalAsignada
where Sucursal.Nombre = 'Iconic California';







-- Nuevos cambios e inserts desde el primer proyecto

ALTER TABLE IconicCaps.Comentario
MODIFY COLUMN Comentario VARCHAR(250) NOT NULL;

UPDATE Comentario
set Comentario.Comentario = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.'
where Comentario.IdComentario = '1';

insert into IconicCaps.Comentario (IdComentario, CedulaCliente, ModeloProducto, Estrellas, Comentario, Fecha, Hora) values
(7, 208700187, 'AD5', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.', '5/2/2024', '16:07');

insert into IconicCaps.Comentario (IdComentario, CedulaCliente, ModeloProducto, Estrellas, Comentario, Fecha, Hora) values
(8, 208700187, 'AD5', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.', '6/2/2024', '19:30');

insert into IconicCaps.Comentario (IdComentario, CedulaCliente, ModeloProducto, Estrellas, Comentario, Fecha, Hora) values
(9, 208700188, 'AD5', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.', '6/2/2024', '19:30');

-- IMPORTANTE ---------------------
ALTER TABLE Producto
ADD Img varchar(255);
-- --------------------------------

-- Agregando Imagenes Iniciales -------------------
UPDATE Producto
SET Img = 'adidas/adidas-dark-gray.png'
where Modelo = 'AD5';

UPDATE Producto
SET Img = 'everlast/everlast-blue.png'
where Modelo = 'EL2';

UPDATE Producto
SET Img = 'gap/gap-mint.png'
where Modelo = 'GP6';

UPDATE Producto
SET Img = 'nike/nike-blue.png'
where Modelo = 'NR2';

UPDATE Producto
SET Img = 'nike/nike-white.png'
where Modelo = 'NR34';

UPDATE Producto
SET Img = 'puma/puma-black.png'
where Modelo = 'PM12';

UPDATE Producto
SET Img = 'under-armour/under-armour-militar.png'
where Modelo = 'UA34';

-- Agregando Nuevos Productos ------------------------

insert into IconicCaps.Producto (Modelo, IdentificadorFiscalProvedor, Categoria, Precio, ExistenciasDisponibles, Img) values
    ('NR99', 98, 'Casual', 30, 3, 'nike/nike-green.png'),
    ('AD77', 76, 'Deportiva', 64, 22, 'adidas/adidas-green.png'),
    ('AD1', 76, 'Casual', 20, 4, 'adidas/adidas-white.png'),
    ('PM33', 69, 'Deportiva', 90, 7, 'puma/puma-green.png'),
    ('PM65', 69, 'Casual', 50, 14, 'puma/puma-pink.png'),
    ('UA35', 11, 'Casual', 45, 19, 'under-armour/under-armour-beige.png'),
    ('UA36', 11, 'Casual', 15, 4, 'under-armour/under-armour-white.png'),
    ('EL69', 54, 'Deportiva', 69, 6, 'everlast/everlast-green.png'),
    ('EL18', 54, 'Casual', 34, 15, 'everlast/everlast-white.png'),
    ('GP0', 34, 'Casual', 110, 20, 'gap/gap-blue.png'),
    ('GP30', 34, 'Casual', 115, 10, 'gap/gap-brown.png');

UPDATE Comentario
SET Estrellas = '2'
WHERE IdComentario = 8;

UPDATE Comentario
SET Estrellas = '3'
WHERE IdComentario = 9;









-- Nuevas entradas del segundo proyecto
USE IconicCaps;
-- Triggers ----------------------------------------

-- Triggers de listaproductospedidos ----------------------------------------

-- Insertar (verifica existencias)
CREATE TRIGGER verificar_stock
BEFORE INSERT ON listaproductospedidos
FOR EACH ROW
BEGIN
    DECLARE stock_disponible INT;
    SELECT ExistenciasDisponibles INTO stock_disponible
    FROM Producto
    WHERE Modelo = NEW.ModeloProducto;
    IF stock_disponible < NEW.CantidadProducto THEN
    SIGNAL SQLSTATE '55000'
    SET MESSAGE_TEXT = 'Se estan solicitando mas productos de los que hay en stock';
    end if;
END;

-- Actualizar (verifica existencias)
CREATE TRIGGER verificar_stock_actualizar
BEFORE UPDATE ON listaproductospedidos
FOR EACH ROW
BEGIN
    DECLARE stock_disponible INT;
    SELECT ExistenciasDisponibles INTO stock_disponible
    FROM Producto
    WHERE Modelo = NEW.ModeloProducto;
    IF stock_disponible < NEW.CantidadProducto THEN
    SIGNAL SQLSTATE '55000'
    SET MESSAGE_TEXT = 'Se estan solicitando mas productos de los que hay en stock';
    end if;
END;

-- Eliminar (eliminar pedido si se eliminan todos los productos asociados a una factura)
CREATE TRIGGER eliminar_pedido
AFTER DELETE ON listaproductospedidos
FOR EACH ROW
BEGIN
    DECLARE cantidad_productos INT;
    SELECT COUNT(*) INTO cantidad_productos
    FROM listaproductospedidos
    WHERE NumeroFacturaPedido = OLD.NumeroFacturaPedido;
    IF cantidad_productos = 0 THEN
    DELETE FROM GarantiaXPedido
    WHERE NumeroFacturaPedido = OLD.NumeroFacturaPedido;
    DELETE FROM EnvioXPedido
    WHERE NumeroFacturaPedido = OLD.NumeroFacturaPedido;
    DELETE FROM Pedido
    WHERE NumeroFactura = OLD.NumeroFacturaPedido;
    end if;
END;

-- Triggers de Comentario ----------------------------------------

-- Insertar (verifica rango de estrellas)
CREATE TRIGGER verificar_estrellas
BEFORE INSERT ON Comentario
FOR EACH ROW
BEGIN
    IF NEW.Estrellas < 0 OR NEW.Estrellas > 5 THEN
    SIGNAL SQLSTATE '55000'
    SET MESSAGE_TEXT = 'Las estrellas deben estar entre 0 y 5';
    end if;
END;

-- Actualizar (verifica rango de estrellas)
CREATE TRIGGER verificar_estrellas_actualizar
BEFORE UPDATE ON Comentario
FOR EACH ROW
BEGIN
    IF NEW.Estrellas < 0 OR NEW.Estrellas > 5 THEN
    SIGNAL SQLSTATE '55000'
    SET MESSAGE_TEXT = 'Las estrellas deben estar entre 0 y 5';
    end if;
END;

-- FALTA ELIMINAR

-- Triggers de Compra ----------------------------------------

-- Insertar (verifica si el producto existe)
CREATE TRIGGER verificar_producto_existente
BEFORE INSERT ON Compra
FOR EACH ROW
BEGIN
    DECLARE cantidad_productos INT;
    SELECT COUNT(*) INTO cantidad_productos
    FROM Producto
    WHERE Modelo = NEW.ModeloProducto;
    IF cantidad_productos = 0 THEN
    SIGNAL SQLSTATE '55000'
    SET MESSAGE_TEXT = 'El producto no existe';
    end if;
END;

-- Actualizar (verifica si el producto existe)
CREATE TRIGGER verificar_producto_existente_actualizar
BEFORE UPDATE ON Compra
FOR EACH ROW
BEGIN
    DECLARE cantidad_productos INT;
    SELECT COUNT(*) INTO cantidad_productos
    FROM Producto
    WHERE Modelo = NEW.ModeloProducto;
    IF cantidad_productos = 0 THEN
    SIGNAL SQLSTATE '55000'
    SET MESSAGE_TEXT = 'El producto no existe';
    end if;
END;

-- Eliminar (si se eliminan todas las compras de un producto de un usuario, se elimina tambien sus comentarios de ese producto)
CREATE TRIGGER eliminar_comentarios
AFTER DELETE ON Compra
FOR EACH ROW
BEGIN
    DECLARE cantidad_compras INT;
    SELECT COUNT(*) INTO cantidad_compras
    FROM Compra
    WHERE ModeloProducto = OLD.ModeloProducto AND CedulaCliente = OLD.CedulaCliente;
    IF cantidad_compras = 0 THEN
    DELETE FROM Comentario
    WHERE ModeloProducto = OLD.ModeloProducto AND CedulaCliente = OLD.CedulaCliente;
    end if;
END;







-- Vistas ----------------------------------------

-- Vista para obtener todos los nombres de los repartidores y su historial de envios
CREATE OR REPLACE VIEW vista_repartidores AS
SELECT CONCAT(Persona.Nombre, ' ', Persona.PrimerApellido, ' ', Persona.SegundoApellido) AS NombreCompleto, Persona.NumeroTelefono,
       Repartidor.NumeroSucursalAsignada, EnvioXPedido.NumeroFacturaPedido, EnvioXPedido.Direccion, EnvioXPedido.FechaEntrega,
       EnvioXPedido.HoraEntrega, EnvioXPedido.Estado
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