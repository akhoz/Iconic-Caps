create database IconicCaps;
use IconicCaps;


create table IconicCaps.Provedor (
    IdentificadorFiscal INT PRIMARY KEY AUTO_INCREMENT,
    NombreEmpresa VARCHAR(25) NOT NULL,
    CorreoElectronico VARCHAR(25) NOT NULL
);

create table IconicCaps.Producto (
    Modelo VARCHAR(25) PRIMARY KEY,
    IdentificadorFiscalProvedor INT NOT NULL,
    Categoria VARCHAR(25) NOT NULL,
    Precio INT NOT NULL,
    ExistenciasDisponibles INT NOT NULL,
    FOREIGN KEY (IdentificadorFiscalProvedor) references Provedor (IdentificadorFiscal)
);

ALTER TABLE IconicCaps.Producto
ADD Img varchar(255);

create table IconicCaps.Sucursal (
    NumeroSucursal INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(25) NOT NULL,
    Direccion VARCHAR(25) NOT NULL,
    NumeroTelefono VARCHAR(25) NOT NULL
);

ALTER TABLE Sucursal
MODIFY COLUMN Direccion VARCHAR(255) NOT NULL;

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
    FOREIGN KEY (CedulaCliente) references Persona (Cedula)
);

create table IconicCaps.Empleado (
    CedulaEmpleado INT PRIMARY KEY,
    NumeroSucursalAsignada INT,
    FOREIGN KEY (CedulaEmpleado) references Persona (Cedula),
    FOREIGN KEY (NumeroSucursalAsignada) references Sucursal (NumeroSucursal) ON DELETE SET NULL
);

create table IconicCaps.Repartidor (
    CedulaRepartidor INT PRIMARY KEY,
    NumeroSucursalAsignada INT,
    FOREIGN KEY (CedulaRepartidor) references Persona (Cedula),
    FOREIGN KEY (NumeroSucursalAsignada) references Sucursal (NumeroSucursal) ON DELETE SET NULL
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
    IdComentario INT PRIMARY KEY AUTO_INCREMENT,
    CedulaCliente INT,
    ModeloProducto VARCHAR(25),
    Estrellas INT NOT NULL,
    Comentario VARCHAR(25) NOT NULL,
    Fecha DATE NOT NULL,
    Hora VARCHAR(5) NOT NULL,
    FOREIGN KEY (CedulaCliente) references Cliente (CedulaCliente),
    FOREIGN KEY (ModeloProducto) references Producto (Modelo)
);

ALTER TABLE IconicCaps.Comentario
MODIFY COLUMN Comentario VARCHAR(250) NOT NULL;

create table IconicCaps.Pedido (
    NumeroFactura INT PRIMARY KEY AUTO_INCREMENT,
    CedulaCliente INT,
    FechaDeCompra DATE NOT NULL,
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
    FechaInicio DATE NOT NULL,
    FechaFinal DATE NOT NULL,
    TipoGarantia VARCHAR(25) NOT NULL,
    FOREIGN KEY (NumeroFacturaPedido) references Pedido (NumeroFactura)
);

create table IconicCaps.EnvioXPedido (
    NumeroFacturaPedido INT PRIMARY KEY,
    CedulaRepartidor INT,
    Direccion VARCHAR(25) NOT NULL,
    FechaEntrega DATE NOT NULL,
    Estado ENUM('Cancelado', 'Entregado', 'En proceso')  NOT NULL,
    FOREIGN KEY (NumeroFacturaPedido) references Pedido (NumeroFactura),
    FOREIGN KEY (CedulaRepartidor) references Repartidor (CedulaRepartidor)
);


DELETE FROM IconicCaps.Sucursal WHERE NumeroSucursal = '2';

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

insert into IconicCaps.Sucursal (Nombre, Direccion, NumeroTelefono) values
    ('Iconic San Jose', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.', '+506 24011111'),
    ('Iconic Buenos Aires', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.', '+54 11 2650-7890'),
    ('Iconic Atlanta', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.', '+1 (212) 555-6789'),
    ('Iconic Madrid', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.', '++34 677 123 456'),
    ('Iconic California', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.', '+1 279-7937'),
    ('Iconic New York', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.', '+1 279-9232');

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

insert into IconicCaps.Cliente (CedulaCliente, Usuario, Contrasena) values
    (208700187, 'HectorPro69', 'GatoSalvaje111'),
    (208700188, 'Juan13', 'Goku12'),
    (208700189, 'PedroCrack', 'Vegeta777'),
    (208700190, 'MariaDB', 'MejorQueMySQL'),
    (208700191, 'Ana2', 'Ana123'),
    (208700192, 'Lusito', 'Comunica');

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

select CedulaRepartidor from repartidor;

INSERT INTO IconicCaps.Comentario (CedulaCliente, ModeloProducto, Estrellas, Comentario, Fecha, Hora) VALUES
    (208700187, 'AD5', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.', '2024-02-04', '10:00'),
    (208700188, 'EL2', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.', '2024-02-05', '11:00'),
    (208700189, 'GP6', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.', '2024-02-06', '12:00'),
    (208700190, 'NR2', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.', '2024-02-07', '13:00'),
    (208700191, 'PM12', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.', '2024-02-08', '14:00'),
    (208700192, 'UA34', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.', '2024-02-09', '15:00');

INSERT INTO IconicCaps.Pedido (CedulaCliente, FechaDeCompra) VALUES
    (208700187, '2024-01-03'),
    (208700188, '2024-01-04'),
    (208700189, '2024-01-05'),
    (208700190, '2024-01-06'),
    (208700191, '2024-01-07'),
    (208700192, '2024-01-08');

insert into IconicCaps.ListaProductosPedidos (NumeroFacturaPedido, ModeloProducto, CantidadProducto) values
    (1, 'AD5', 3),
    (2, 'EL2', 2),
    (3, 'GP6', 1),
    (4, 'NR2', 5),
    (5, 'PM12', 6),
    (6, 'UA34', 7);

INSERT INTO IconicCaps.GarantiaXPedido (NumeroFacturaPedido, FechaInicio, FechaFinal, TipoGarantia) VALUES
    (1, '2024-01-03', '2025-01-03', '100'),
    (2, '2024-01-04', '2029-01-04', '70'),
    (3, '2024-01-05', '2025-01-05', '100'),
    (4, '2024-01-06', '2026-01-06', '100'),
    (5, '2024-01-07', '2027-01-07', '50'),
    (6, '2024-01-08', '2025-01-08', '20');

INSERT INTO IconicCaps.EnvioXPedido (NumeroFacturaPedido, CedulaRepartidor, Direccion, FechaEntrega, Estado) VALUES
    (1, 208700199, 'Chachagua', '2024-02-03', 'Cancelado'),
    (2, 208700200, 'San Ramon', '2024-02-04', 'Entregado'),
    (3, 208700201, 'San Pedro', '2024-02-05', 'En proceso'),
    (4, 208700202, 'San Jose', '2024-02-06', 'En proceso'),
    (5, 208700203, 'Alajuela', '2024-02-07', 'En proceso'),
    (6, 208700204, 'Alaska', '2024-02-08', 'Entregado');

insert into IconicCaps.ListaProductosPedidos (NumeroFacturaPedido, ModeloProducto, CantidadProducto) values
    (4, 'EL2', 2);

insert into IconicCaps.Producto (Modelo, IdentificadorFiscalProvedor, Categoria, Precio, ExistenciasDisponibles, Img) values
    ('NR34', 98, 'Casual', 200, 5, 'nike/nike-white.png');

use IconicCaps;

UPDATE Comentario
set Comentario.Comentario = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.'
where Comentario.IdComentario = '1';

INSERT INTO IconicCaps.Comentario (CedulaCliente, ModeloProducto, Estrellas, Comentario, Fecha, Hora) VALUES
(208700187, 'AD5', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.', '2024-02-05', '16:07'),
(208700187, 'AD5', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.', '2024-02-06', '19:30'),
(208700188, 'AD5', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.', '2024-02-06', '19:30');

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
SET Img = 'puma/puma-black.png'
where Modelo = 'PM12';

UPDATE Producto
SET Img = 'under-armour/under-armour-militar.png'
where Modelo = 'UA34';

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

insert into IconicCaps.Persona (Cedula, Nombre, PrimerApellido, SegundoApellido, NumeroTelefono) values
    (208700205, 'Gabriela', 'Fernandez', 'Lopez', '+506 89757668'),
    (208700206, 'Ricardo', 'Morales', 'Castro', '+506 89757669'),
    (208700207, 'Isabel', 'Chavez', 'Soto', '+506 89757670'),
    (208700208, 'Santiago', 'Rojas', 'Jimenez', '+506 89757671'),
    (208700209, 'Valeria', 'Mendez', 'Campos', '+506 89757672'),
    (208700210, 'Federico', 'Vargas', 'Araya', '+506 89757673'),
    (208700211, 'Diana', 'Ortiz', 'Mora', '+506 89757674'),
    (208700212, 'Alejandra', 'Fuentes', 'Solano', '+506 89757675'),
    (208700213, 'Jorge', 'Arias', 'Castillo', '+506 89757676'),
    (208700214, 'Natalia', 'Cordero', 'Guzman', '+506 89757677'),
    (208700215, 'Mauricio', 'Herrera', 'Alfaro', '+506 89757678'),
    (208700216, 'Victoria', 'Salazar', 'Morales', '+506 89757679'),
    (208700217, 'Andres', 'Campos', 'Umana', '+506 89757680'),
    (208700218, 'Lucia', 'Morales', 'Vargas', '+506 89757681');

insert into IconicCaps.Cliente (CedulaCliente, Usuario, Contrasena) values
    (208700205, 'GabrielaCool', 'Perritos123'),
    (208700206, 'Ricky99', 'TopSecret007'),
    (208700207, 'Isabelita', 'FlorDeLoto22'),
    (208700208, 'SantiRoj', 'Jugador10'),
    (208700209, 'ValMend', 'Mariposa456'),
    (208700210, 'FedeV', 'BuenAmigo88'),
    (208700211, 'DianaOrtiz', 'Pasion123'),
    (208700212, 'AleFuentes', 'SuenoVerde44'),
    (208700213, 'JorgeC', 'Conectado999'),
    (208700214, 'NatyC', 'Gatito789'),
    (208700215, 'MauHer', 'Riendo777'),
    (208700216, 'VickyS', 'Bailando666'),
    (208700217, 'AndyCam', 'Paseo123'),
    (208700218, 'LucyMor', 'Libelula321');

insert into IconicCaps.Sucursal (Nombre, Direccion, NumeroTelefono) values
    ('Iconic Milan', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.', '+39 02 1234 5678'),
    ('Iconic Manchester', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.', '+44 161 123 4567'),
    ('Iconic Paris', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.', '+33 1 23 45 67 89'),
    ('Iconic Tokyo', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.', '+81 3-1234-5678'),
    ('Iconic Rome', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.', '+39 06 1234 5678'),
    ('Iconic Barcelona', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.', '+34 93 123 45 67'),
    ('Iconic Dubai', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.', '+971 4 123 4567'),
    ('Iconic Sydney', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.', '+61 2 1234 5678'),
    ('Iconic Singapore', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.', '+65 1234 5678'),
    ('Iconic Hong Kong', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.', '+852 1234 5678'),
    ('Iconic Zurich', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.', '+41 44 123 45 67'),
    ('Iconic Vienna', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.', '+43 1 1234567'),
    ('Iconic Seattle', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.', '+1 321-142-4896'),
    ('Iconic Los Angeles', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod libero nec sapien faucibus, nec consequat libero mollis.', '+1 213-123-4567');

insert into IconicCaps.Persona (Cedula, Nombre, PrimerApellido, SegundoApellido, NumeroTelefono) values
    (208700219, 'Valentino', 'Ramirez', 'Garcia', '+506 89757682'),
    (208700220, 'Mariana', 'Gonzalez', 'Lopez', '+506 89757683'),
    (208700221, 'Daniel', 'Martinez', 'Perez', '+506 89757684'),
    (208700222, 'Luciana', 'Hernandez', 'Gutierrez', '+506 89757685'),
    (208700223, 'Santiago', 'Alvarez', 'Sanchez', '+506 89757686'),
    (208700224, 'Abril', 'Lopez', 'Rodriguez', '+506 89757687'),
    (208700225, 'Felipe', 'Sanchez', 'Fernandez', '+506 89757688'),
    (208700226, 'Valeria', 'Gomez', 'Torres', '+506 89757689'),
    (208700227, 'Matias', 'Perez', 'Alvarez', '+506 89757690'),
    (208700228, 'Catalina', 'Gutierrez', 'Vazquez', '+506 89757691'),
    (208700229, 'Maximiliano', 'Fernandez', 'Diaz', '+506 89757692'),
    (208700230, 'Renata', 'Torres', 'Martinez', '+506 89757693'),
    (208700231, 'Diego', 'Rodriguez', 'Hernandez', '+506 89757694'),
    (208700232, 'Antonia', 'Martinez', 'Gomez', '+506 89757695');

insert into IconicCaps.Empleado (CedulaEmpleado, NumeroSucursalAsignada) values
    (208700219, 7),
    (208700220, 8),
    (208700221, 9),
    (208700222, 10),
    (208700223, 11),
    (208700224, 12),
    (208700225, 13),
    (208700226, 14),
    (208700227, 15),
    (208700228, 16),
    (208700229, 17),
    (208700230, 18),
    (208700231, 19),
    (208700232, 20);

insert into IconicCaps.Persona (Cedula, Nombre, PrimerApellido, SegundoApellido, NumeroTelefono) values
    (208700233, 'Oliver', 'Smith', 'Johnson', '+506 89757668'),
    (208700234, 'Sophia', 'Brown', 'Williams', '+506 89757669'),
    (208700235, 'Liam', 'Miller', 'Jones', '+506 89757670'),
    (208700236, 'Emma', 'Davis', 'Taylor', '+506 89757671'),
    (208700237, 'Noah', 'Wilson', 'Anderson', '+506 89757672'),
    (208700238, 'Olivia', 'Moore', 'Jackson', '+506 89757673'),
    (208700239, 'Ethan', 'Taylor', 'White', '+506 89757674'),
    (208700240, 'Ava', 'Johnson', 'Harris', '+506 89757675'),
    (208700241, 'William', 'Martinez', 'Clark', '+506 89757676'),
    (208700242, 'Sophie', 'Jones', 'Lewis', '+506 89757677'),
    (208700243, 'Mason', 'Garcia', 'Hill', '+506 89757678'),
    (208700244, 'Charlotte', 'Brown', 'Robinson', '+506 89757679'),
    (208700245, 'Logan', 'Rodriguez', 'Walker', '+506 89757680'),
    (208700246, 'Amelia', 'Gomez', 'Hall', '+506 89757681');

insert into IconicCaps.Repartidor (CedulaRepartidor, NumeroSucursalAsignada) values
    (208700233, 7),
    (208700234, 8),
    (208700235, 9),
    (208700236, 10),
    (208700237, 11),
    (208700238, 12),
    (208700239, 13),
    (208700240, 14),
    (208700241, 15),
    (208700242, 16),
    (208700243, 17),
    (208700244, 18),
    (208700245, 19),
    (208700246, 20);

INSERT INTO IconicCaps.Comentario (CedulaCliente, ModeloProducto, Estrellas, Comentario, Fecha, Hora) VALUES
    (208700187, 'AD5', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-02-10', '16:00'),
    (208700187, 'AD5', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-02-11', '17:00'),
    (208700187, 'AD5', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-02-12', '18:00'),

    (208700188, 'EL2', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-02-13', '19:00'),
    (208700188, 'EL2', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-02-14', '20:00'),
    (208700188, 'EL2', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-02-15', '21:00'),

    (208700189, 'GP6', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-02-16', '22:00'),
    (208700189, 'GP6', 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-02-17', '23:00'),
    (208700189, 'GP6', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-02-18', '00:00'),

    (208700190, 'NR2', 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-02-19', '01:00'),
    (208700190, 'NR2', 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-02-20', '02:00'),
    (208700190, 'NR2', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-02-21', '03:00'),

    (208700191, 'PM12', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-02-22', '04:00'),
    (208700191, 'PM12', 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-02-23', '05:00'),
    (208700191, 'PM12', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-02-24', '06:00'),

    (208700192, 'UA34', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-02-25', '07:00'),
    (208700192, 'UA34', 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-02-26', '08:00'),
    (208700192, 'UA34', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-02-27', '09:00');

INSERT INTO IconicCaps.Comentario (CedulaCliente, ModeloProducto, Estrellas, Comentario, Fecha, Hora) VALUES
    (208700187, 'UA35', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-02-28', '10:00'),
    (208700187, 'UA35', 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-02-29', '11:00'),
    (208700187, 'UA35', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-01', '12:00'),

    (208700188, 'UA36', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-02', '13:00'),
    (208700188, 'UA36', 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-03', '14:00'),
    (208700188, 'UA36', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-04', '15:00'),

    (208700189, 'GP0', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-05', '16:00'),
    (208700189, 'GP0', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-06', '17:00'),
    (208700189, 'GP0', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-07', '18:00'),

    (208700190, 'GP30', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-08', '19:00'),
    (208700190, 'GP30', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-09', '20:00'),
    (208700190, 'GP30', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-10', '21:00'),

    (208700191, 'EL18', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-11', '22:00'),
    (208700191, 'EL18', 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-12', '23:00'),
    (208700191, 'EL18', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-13', '00:00'),

    (208700192, 'EL69', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-14', '01:00'),
    (208700192, 'EL69', 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-15', '02:00'),
    (208700192, 'EL69', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-16', '03:00'),

    (208700205, 'PM33', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-17', '04:00'),
    (208700205, 'PM33', 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-18', '05:00'),
    (208700205, 'PM33', 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-19', '06:00'),

    (208700206, 'PM65', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-20', '07:00'),
    (208700206, 'PM65', 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-21', '08:00'),
    (208700206, 'PM65', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-22', '09:00'),

    (208700207, 'AD1', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-23', '10:00'),
    (208700207, 'AD1', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-24', '11:00'),
    (208700207, 'AD1', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-25', '12:00'),

    (208700208, 'AD77', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-26', '13:00'),
    (208700208, 'AD77', 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-27', '14:00'),
    (208700208, 'AD77', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-28', '15:00'),

    (208700209, 'NR34', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-29', '16:00'),
    (208700209, 'NR34', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-30', '17:00'),
    (208700209, 'NR34', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-31', '18:00'),

    (208700210, 'NR99', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-04-01', '19:00'),
    (208700210, 'NR99', 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-04-02', '20:00'),
    (208700210, 'NR99', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-04-03', '21:00');

INSERT INTO IconicCaps.Comentario (CedulaCliente, ModeloProducto, Estrellas, Comentario, Fecha, Hora) VALUES
    (208700190, 'UA35', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-02-28', '10:00'),
    (208700205, 'UA35', 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-02-29', '11:00'),
    (208700192, 'UA35', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-01', '12:00'),

    (208700191, 'UA36', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-02', '13:00'),
    (208700206, 'UA36', 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-03', '14:00'),
    (208700188, 'UA36', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-04', '15:00'),

    (208700207, 'GP0', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-05', '16:00'),
    (208700209, 'GP0', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-06', '17:00'),
    (208700187, 'GP0', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-07', '18:00'),

    (208700192, 'GP30', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-08', '19:00'),
    (208700191, 'GP30', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-09', '20:00'),
    (208700190, 'GP30', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-10', '21:00'),

    (208700210, 'EL18', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-11', '22:00'),
    (208700192, 'EL18', 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-12', '23:00'),
    (208700191, 'EL18', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-13', '00:00'),

    (208700188, 'EL69', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-14', '01:00'),
    (208700187, 'EL69', 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-15', '02:00'),
    (208700191, 'EL69', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-16', '03:00'),

    (208700209, 'PM33', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-17', '04:00'),
    (208700188, 'PM33', 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-18', '05:00'),
    (208700206, 'PM33', 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-19', '06:00'),

    (208700207, 'PM65', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-20', '07:00'),
    (208700205, 'PM65', 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-21', '08:00'),
    (208700192, 'PM65', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-22', '09:00'),

    (208700210, 'AD1', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-23', '10:00'),
    (208700190, 'AD1', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-24', '11:00'),
    (208700207, 'AD1', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-25', '12:00'),

    (208700209, 'AD77', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-26', '13:00'),
    (208700210, 'AD77', 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-27', '14:00'),
    (208700205, 'AD77', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-28', '15:00'),

    (208700206, 'NR34', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-29', '16:00'),
    (208700207, 'NR34', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-30', '17:00'),
    (208700210, 'NR34', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-03-31', '18:00'),

    (208700187, 'NR99', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-04-01', '19:00'),
    (208700188, 'NR99', 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-04-02', '20:00'),
    (208700191, 'NR99', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2024-04-03', '21:00');


INSERT INTO IconicCaps.Pedido (CedulaCliente, FechaDeCompra) VALUES
    (208700217, '2024-01-03'),
    (208700218, '2024-01-04'),
    (208700209, '2024-01-05'),
    (208700216, '2024-01-06'),
    (208700205, '2024-01-07'),
    (208700214, '2024-01-08');

INSERT INTO IconicCaps.ListaProductosPedidos (NumeroFacturaPedido, ModeloProducto, CantidadProducto) VALUES
    (7, 'AD5', 3),
    (8, 'EL2', 2),
    (9, 'GP6', 1),
    (10, 'NR2', 5),
    (11, 'PM12', 6),
    (12, 'UA34', 7);

INSERT INTO IconicCaps.GarantiaXPedido (NumeroFacturaPedido, FechaInicio, FechaFinal, TipoGarantia) VALUES
    (7, '2024-01-03', '2025-01-03', '70'),
    (8, '2024-01-04', '2029-01-04', '30'),
    (9, '2024-01-05', '2025-01-05', '40'),
    (10, '2024-01-06', '2026-01-06', '90'),
    (11, '2024-01-07', '2027-01-07', '20'),
    (12, '2024-01-08', '2025-01-08', '50');

INSERT INTO IconicCaps.EnvioXPedido (NumeroFacturaPedido, CedulaRepartidor, Direccion, FechaEntrega, Estado) VALUES
    (7, 208700243, 'Paris', '2024-02-03', 'En proceso'),
    (8, 208700244, 'Berlin', '2024-02-04', 'En proceso'),
    (9, 208700245, 'London', '2024-02-05', 'Cancelado'),
    (10, 208700246, 'New York', '2024-02-06', 'Entregado'),
    (11, 208700233, 'Rome', '2024-02-07', 'En proceso'),
    (12, 208700234, 'Madrid', '2024-02-08', 'Entregado');

INSERT INTO IconicCaps.Compra (ModeloProducto, CedulaCliente) VALUES
    ('AD5', 208700217),
    ('EL2', 208700218),
    ('GP6', 208700209),
    ('NR2', 208700216),
    ('PM12', 208700205),
    ('UA34', 208700214);

INSERT INTO IconicCaps.Pedido (CedulaCliente, FechaDeCompra) VALUES
    (208700211, '2024-01-03'),
    (208700212, '2024-01-04'),
    (208700213, '2024-01-05'),
    (208700215, '2024-01-06'),
    (208700210, '2024-01-07'),
    (208700218, '2024-01-08');

INSERT INTO IconicCaps.ListaProductosPedidos (NumeroFacturaPedido, ModeloProducto, CantidadProducto) VALUES
    (13, 'AD77', 3),
    (14, 'PM33', 2),
    (15, 'EL69', 1),
    (16, 'NR99', 5),
    (17, 'GP0', 6),
    (18, 'UA35', 7);

INSERT INTO IconicCaps.GarantiaXPedido (NumeroFacturaPedido, FechaInicio, FechaFinal, TipoGarantia) VALUES
    (13, '2024-01-03', '2025-01-03', '50'),
    (14, '2024-01-04', '2029-01-04', '70'),
    (15, '2024-01-05', '2025-01-05', '20'),
    (16, '2024-01-06', '2026-01-06', '90'),
    (17, '2024-01-07', '2027-01-07', '40'),
    (18, '2024-01-08', '2025-01-08', '80');

INSERT INTO IconicCaps.EnvioXPedido (NumeroFacturaPedido, CedulaRepartidor, Direccion, FechaEntrega, Estado) VALUES
    (13, 208700241, 'Amsterdam', '2024-02-03', 'Cancelado'),
    (14, 208700242, 'Barcelona', '2024-02-04', 'Entregado'),
    (15, 208700243, 'Brussels', '2024-02-05', 'En proceso'),
    (16, 208700244, 'Copenhagen', '2024-02-06', 'En proceso'),
    (17, 208700245, 'Dublin', '2024-02-07', 'En proceso'),
    (18, 208700246, 'Edinburgh', '2024-02-08', 'Entregado');

INSERT INTO IconicCaps.Compra (ModeloProducto, CedulaCliente) VALUES
    ('AD77', 208700211),
    ('PM33', 208700212),
    ('EL69', 208700213),
    ('NR99', 208700215),
    ('GP0', 208700210),
    ('UA35', 208700218);

INSERT INTO IconicCaps.Persona (Cedula, Nombre, PrimerApellido, SegundoApellido, NumeroTelefono) VALUE
    (108403221, 'Olivier', 'Giroud', 'Leao', '+506 82235641');

INSERT INTO Empleado (CedulaEmpleado, NumeroSucursalAsignada) VALUE
    (108403221, 7);


-- Nuevas entradas del segundo proyecto
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

-- Funciones

DELIMITER //

CREATE FUNCTION getContrasenaByUsuario(usuario VARCHAR(25)) RETURNS VARCHAR(35)
    READS SQL DATA
BEGIN
    DECLARE contrasena VARCHAR(35);
    SELECT Cliente.Contrasena INTO contrasena FROM Cliente WHERE Cliente.Usuario = usuario;
    RETURN contrasena;
END //

DELIMITER ;


SELECT getContrasenaByUsuario('nombre_usuario');