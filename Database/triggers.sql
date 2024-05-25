use iconiccaps;

-- Triggers de listaproductospedidos ----------------------------------------

-- Insertar (verifica existencias)
DELIMITER //
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
END //
DELIMITER ;

-- Actualizar (verifica existencias)
DELIMITER //
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
END //
DELIMITER ;

-- Eliminar (eliminar pedido si se eliminan todos los productos asociados a una factura)
DELIMITER //
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
END //
DELIMITER ;

-- Triggers de Comentario ----------------------------------------

-- Insertar (verifica rango de estrellas)
DELIMITER //
CREATE TRIGGER verificar_estrellas
BEFORE INSERT ON Comentario
FOR EACH ROW
BEGIN
    IF NEW.Estrellas < 0 OR NEW.Estrellas > 5 THEN
    SIGNAL SQLSTATE '55000'
    SET MESSAGE_TEXT = 'Las estrellas deben estar entre 0 y 5';
    end if;
END //
DELIMITER ;

-- Actualizar (verifica rango de estrellas)
DELIMITER //
CREATE TRIGGER verificar_estrellas_actualizar
BEFORE UPDATE ON Comentario
FOR EACH ROW
BEGIN
    IF NEW.Estrellas < 0 OR NEW.Estrellas > 5 THEN
    SIGNAL SQLSTATE '55000'
    SET MESSAGE_TEXT = 'Las estrellas deben estar entre 0 y 5';
    end if;
END //
DELIMITER ;

-- FALTA ELIMINAR
DELIMITER //
CREATE TRIGGER notificar_eliminacion
AFTER DELETE ON comentario
FOR EACH ROW
BEGIN
    SIGNAL SQLSTATE '55000'
    SET MESSAGE_TEXT = 'Comentario eliminado';
END //
DELIMITER ;

-- Triggers de Persona (ADMIN) ----------------------------------------

-- Trigger para antes de insertar, verificar que no inserte un usuario igual que ADMIN
DELIMITER //
CREATE TRIGGER verificar_admin
BEFORE INSERT ON Persona
FOR EACH ROW
BEGIN
    IF NEW.Nombre = 'ADMIN' THEN
    SIGNAL SQLSTATE '55000'
    SET MESSAGE_TEXT = 'No se puede insertar un usuario con el nombre ADMIN';
    end if;
END //
DELIMITER ;

-- Trigger para antes de actualizar, verificar que no actualice un usuario igual que ADMIN
DELIMITER //
CREATE TRIGGER verificar_admin_actualizar
BEFORE UPDATE ON Persona
FOR EACH ROW
BEGIN
    IF NEW.Nombre = 'ADMIN' THEN
    SIGNAL SQLSTATE '55000'
    SET MESSAGE_TEXT = 'No se puede actualizar un usuario con el nombre ADMIN';
    end if;
END //

-- Trigger para que no se pueda eliminar el usuario ADMIN
DELIMITER //
CREATE TRIGGER verificar_admin_eliminar
BEFORE DELETE ON Persona
FOR EACH ROW
BEGIN
    IF OLD.Nombre = 'ADMIN' THEN
    SIGNAL SQLSTATE '55000'
    SET MESSAGE_TEXT = 'No se puede eliminar el usuario ADMIN';
    end if;
END //

-- Triggers Cliente

-- Trigger para evitar que se elimine el usuario ADMIN
DELIMITER //
CREATE TRIGGER verificar_admin_eliminar_cliente
BEFORE DELETE ON Cliente
FOR EACH ROW
BEGIN
    IF OLD.CedulaCliente = 1 THEN
    SIGNAL SQLSTATE '55000'
    SET MESSAGE_TEXT = 'No se puede eliminar el usuario ADMIN';
    end if;
END //

-- Trigger para evitar que se actualice el usuario ADMIN
DELIMITER //
CREATE TRIGGER verificar_admin_actualizar_cliente
BEFORE UPDATE ON Cliente
FOR EACH ROW
BEGIN
    IF OLD.Usuario = "ADMIN" THEN
    SIGNAL SQLSTATE '55000'
    SET MESSAGE_TEXT = 'No se puede actualizar el usuario ADMIN';
    end if;
END //

-- Trigger para evitar que se inserte el usuario ADMIN
DELIMITER //
CREATE TRIGGER verificar_admin_insertar_cliente
BEFORE INSERT ON Cliente
FOR EACH ROW
BEGIN
    IF NEW.Usuario = "ADMIN" THEN
    SIGNAL SQLSTATE '55000'
    SET MESSAGE_TEXT = 'No se puede insertar el usuario ADMIN';
    end if;
END //

-- Trigger adicional
DELIMITER //
CREATE TRIGGER actualizar_stock
AFTER INSERT ON listaproductospedidos
FOR EACH ROW
BEGIN
    UPDATE producto
    SET ExistenciasDisponibles = ExistenciasDisponibles -  NEW.CantidadProducto
    WHERE producto.Modelo = NEW.ModeloProducto;
END //
DELIMITER ;