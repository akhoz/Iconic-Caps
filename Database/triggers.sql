use iconiccaps;


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