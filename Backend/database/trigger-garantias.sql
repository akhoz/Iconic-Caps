-- (Opcional pero útil) Vista que calcula el total por pedido
CREATE OR REPLACE VIEW IconicCaps.TotalPorPedido AS
SELECT 
  P.NumeroFactura,
  COALESCE(SUM(LP.CantidadProducto * PR.Precio), 0) AS TotalCompra
FROM IconicCaps.Pedido P
LEFT JOIN IconicCaps.ListaProductosPedidos LP ON LP.NumeroFacturaPedido = P.NumeroFactura
LEFT JOIN IconicCaps.Producto PR ON PR.Modelo = LP.ModeloProducto
GROUP BY P.NumeroFactura;

-- Procedimiento que recalcula garantía = total/100
DROP PROCEDURE IF EXISTS IconicCaps.sp_recalcular_total_y_garantia;
DELIMITER $$
CREATE PROCEDURE IconicCaps.sp_recalcular_total_y_garantia(IN p_NumeroFactura INT)
BEGIN
  DECLARE v_total DECIMAL(18,2) DEFAULT 0.00;
  DECLARE v_garantia DECIMAL(18,2) DEFAULT 0.00;

  SELECT COALESCE(SUM(LP.CantidadProducto * PR.Precio), 0.00)
    INTO v_total
  FROM IconicCaps.ListaProductosPedidos LP
  JOIN IconicCaps.Producto PR ON PR.Modelo = LP.ModeloProducto
  WHERE LP.NumeroFacturaPedido = p_NumeroFactura;

  -- Regla solicitada:
  SET v_garantia = ROUND(v_total / 100, 2);

  -- Si quisieras el antiguo tope de 100%, usar:
  -- SET v_garantia = LEAST(100.00, ROUND(v_total, 2));

  -- Tu columna TipoGarantia es VARCHAR(25): guardamos como texto formateado
  UPDATE IconicCaps.GarantiaXPedido
     SET TipoGarantia = FORMAT(v_garantia, 2)
   WHERE NumeroFacturaPedido = p_NumeroFactura;
END $$
DELIMITER ;

-- Triggers que recalculan después de cualquier cambio en la lista de productos
DROP TRIGGER IF EXISTS IconicCaps.trg_listaproductos_ai;
DELIMITER $$
CREATE TRIGGER IconicCaps.trg_listaproductos_ai
AFTER INSERT ON IconicCaps.ListaProductosPedidos
FOR EACH ROW
BEGIN
  CALL IconicCaps.sp_recalcular_total_y_garantia(NEW.NumeroFacturaPedido);
END $$
DELIMITER ;

DROP TRIGGER IF EXISTS IconicCaps.trg_listaproductos_au;
DELIMITER $$
CREATE TRIGGER IconicCaps.trg_listaproductos_au
AFTER UPDATE ON IconicCaps.ListaProductosPedidos
FOR EACH ROW
BEGIN
  CALL IconicCaps.sp_recalcular_total_y_garantia(NEW.NumeroFacturaPedido);
END $$
DELIMITER ;

DROP TRIGGER IF EXISTS IconicCaps.trg_listaproductos_ad;
DELIMITER $$
CREATE TRIGGER IconicCaps.trg_listaproductos_ad
AFTER DELETE ON IconicCaps.ListaProductosPedidos
FOR EACH ROW
BEGIN
  CALL IconicCaps.sp_recalcular_total_y_garantia(OLD.NumeroFacturaPedido);
END $$
DELIMITER ;
