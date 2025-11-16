export const validatePedidoData = (req, res, next) => {
  const { NumeroFacturaPedido, ModeloProducto, CantidadProducto } = req.body;

  if (!NumeroFacturaPedido || !ModeloProducto || !CantidadProducto) {
    return res.status(400).json({
      message: "Datos incompletos en el pedido",
      required: ['NumeroFacturaPedido', 'ModeloProducto', 'CantidadProducto']
    });
  }

  if (isNaN(parseInt(NumeroFacturaPedido)) || isNaN(parseInt(CantidadProducto))) {
    return res.status(400).json({ message: "NumeroFacturaPedido y CantidadProducto deben ser números" });
  }

  if (parseInt(CantidadProducto) <= 0) {
    return res.status(400).json({ message: "La cantidad debe ser mayor a 0" });
  }

  next();
};

