// importamos el modelo
import ListaProductosPedidosModel from "../models/ListaProductosPedidosModel.js"

//** Métodos para el CRUD**/

//Mostrar todos los registros
export const getAllListaProductos = async (req, res) => {
  try {
    const pedidos = await ListaProductosPedidosModel.findAll()
    res.jsonp(pedidos)

  } catch (error) {
    res.json({ message: error.message })
  }
};

export const createListaPoductos = async (req, res) => {
  try {
    const { NumeroFacturaPedido, ModeloProducto, CantidadProducto } = req.body;

    // VALIDACIONES CRÍTICAS – NECESARIAS PARA PREVENIR A04 + CWE-179
    if (!NumeroFacturaPedido || !ModeloProducto || !CantidadProducto) {
      return res.status(400).json({
        message: "Datos incompletos (NumeroFacturaPedido, ModeloProducto, CantidadProducto requeridos)"
      });
    }

    const cantidad = parseInt(CantidadProducto, 10);

    if (isNaN(cantidad)) {
      return res.status(400).json({ message: "CantidadProducto debe ser un número" });
    }

    if (cantidad <= 0) {
      return res.status(400).json({ message: "CantidadProducto debe ser mayor a 0" });
    }

    if (cantidad > 1000) {
      return res.status(400).json({ message: "CantidadProducto no puede exceder 1000 unidades" });
    }

    // Verificar existencia del producto
    const producto = await ProductoModel.findOne({
      where: { Modelo: ModeloProducto }
    });

    if (!producto) {
      return res.status(404).json({ message: "El producto especificado no existe" });
    }

    // Validar stock suficiente
    if (producto.ExistenciasDisponibles < cantidad) {
      return res.status(400).json({
        message: `Stock insuficiente. Disponibles: ${producto.ExistenciasDisponibles}, solicitados: ${cantidad}`
      });
    }

    // Si pasa todas las validaciones → insertar registro
    await ListaProductosPedidosModel.create({
      NumeroFacturaPedido,
      ModeloProducto,
      CantidadProducto: cantidad
    });

    return res.status(201).json({ message: "Lista de productos creada exitosamente" });
  } catch (error) {
    return res.status(500).json({
      message: "Error al crear la lista de productos",
      error: error.message
    });
  }
};
