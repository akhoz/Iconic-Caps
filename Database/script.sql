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
    FOREIGN KEY (IdentificadorFiscalProvedor) references Provedor (IdentificadorFiscal) ON DELETE CASCADE
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
    FOREIGN KEY (CedulaCliente) references Persona (Cedula) ON DELETE CASCADE
);

create table IconicCaps.Empleado (
    CedulaEmpleado INT PRIMARY KEY,
    NumeroSucursalAsignada INT,
    FOREIGN KEY (CedulaEmpleado) references Persona (Cedula) ON DELETE CASCADE,
    FOREIGN KEY (NumeroSucursalAsignada) references Sucursal (NumeroSucursal) ON DELETE SET NULL
);

create table IconicCaps.Repartidor (
    CedulaRepartidor INT PRIMARY KEY,
    NumeroSucursalAsignada INT,
    FOREIGN KEY (CedulaRepartidor) references Persona (Cedula) ON DELETE CASCADE,
    FOREIGN KEY (NumeroSucursalAsignada) references Sucursal (NumeroSucursal) ON DELETE SET NULL
);

create table IconicCaps.Compra (
    IdCompra INT AUTO_INCREMENT,
    ModeloProducto VARCHAR(25),
    CedulaCliente INT,
    FOREIGN KEY (ModeloProducto) references Producto (Modelo) ON DELETE CASCADE,
    FOREIGN KEY (CedulaCliente) references Cliente (CedulaCliente) ON DELETE CASCADE,
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
    FOREIGN KEY (CedulaCliente) references Cliente (CedulaCliente) ON DELETE CASCADE,
    FOREIGN KEY (ModeloProducto) references Producto (Modelo) ON DELETE CASCADE
);

ALTER TABLE IconicCaps.Comentario
MODIFY COLUMN Comentario VARCHAR(250) NOT NULL;

create table IconicCaps.Pedido (
    NumeroFactura INT PRIMARY KEY AUTO_INCREMENT,
    CedulaCliente INT,
    FechaDeCompra DATE NOT NULL,
    FOREIGN KEY (CedulaCliente) references Cliente (CedulaCliente) ON DELETE SET NULL
);

create table IconicCaps.ListaProductosPedidos (
    NumeroFacturaPedido INT,
    ModeloProducto VARCHAR(25),
    CantidadProducto INT,
    FOREIGN KEY (NumeroFacturaPedido) references Pedido (NumeroFactura) ON DELETE CASCADE,
    FOREIGN KEY (ModeloProducto) references Producto (Modelo) ON DELETE CASCADE,
    PRIMARY KEY (NumeroFacturaPedido, ModeloProducto)
);

create table IconicCaps.GarantiaXPedido (
    NumeroFacturaPedido INT PRIMARY KEY,
    FechaInicio DATE NOT NULL,
    FechaFinal DATE NOT NULL,
    TipoGarantia VARCHAR(25) NOT NULL,
    FOREIGN KEY (NumeroFacturaPedido) references Pedido (NumeroFactura) ON DELETE CASCADE
);

create table IconicCaps.EnvioXPedido (
    NumeroFacturaPedido INT PRIMARY KEY,
    CedulaRepartidor INT,
    Direccion VARCHAR(25) NOT NULL,
    FechaEntrega DATE NOT NULL,
    Estado ENUM('Cancelado', 'Entregado', 'En proceso')  NOT NULL,
    FOREIGN KEY (NumeroFacturaPedido) references Pedido (NumeroFactura) ON DELETE CASCADE,
    FOREIGN KEY (CedulaRepartidor) references Repartidor (CedulaRepartidor) ON DELETE SET NULL
);

ALTER TABLE Sucursal
ADD Img VARCHAR(100);

ALTER TABLE Sucursal
ADD LinkGoogleMaps VARCHAR(100);