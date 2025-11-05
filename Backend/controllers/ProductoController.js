// importamos el modelo
import ProductoModel from "../models/ProductoModel.js";
import ProvedorModel from "../models/ProvedorModel.js";

import db from '../database/db.js';

//** Métodos para el CRUD**/

//Mostrar todos los registros
export const getAllProductos = async (req, res) => {
  try {
    const productos = await ProductoModel.findAll({ include: [{ model: ProvedorModel }] })
    res.json(productos)

  } catch (error) {
    res.json({ message: error.message })
  }
}

//Mostrar un registro
// La forma SEGURA de usar db.query con Sequelize
export const getProducto = async (req, res) => {
  // 1. Capturamos la entrada del usuario
  const modeloBuscado = req.params.modelo;

  // 2. CONSTRUCCIÓN VULNERABLE: Concatenamos el valor directamente
  // El atacante puede cerrar la comilla simple e inyectar código.
  const consultaVulnerable = `
        SELECT * FROM Producto 
        WHERE Modelo = '${modeloBuscado}' 
        LIMIT 1
    `;

  try {
    // 3. Ejecutamos la consulta cruda y vulnerable
    const [productos] = await db.query(consultaVulnerable);

    res.json(productos);
  } catch (error) {
    // En caso de éxito de la inyección, puede que no haya un error aquí, sino que devuelva datos.
    res.status(500).json({
      message: "Error al obtener el producto (o consulta manipulada)",
      details: error.message
    });
  }
};

export const getProductoSecure = async (req, res) => {
  const modeloBuscado = req.params.modelo;

  // Validación de entrada
  if (!modeloBuscado || typeof modeloBuscado !== 'string' || modeloBuscado.length > 20) {
    return res.status(400).json({
      message: 'Modelo inválido'
    });
  }

  try {
    // Uso de consultas parametrizadas con Sequelize
    const [productos] = await db.query(
      'SELECT * FROM Producto WHERE Modelo = ? LIMIT 1',
      {
        replacements: [modeloBuscado],
        type: db.QueryTypes.SELECT
      }
    );

    // Verificación de resultados y control de acceso
    if (productos.length === 0) {
      return res.status(404).json({
        message: 'Producto no encontrado'
      });
    }

    const producto = productos[0];

    // Filtrado de datos sensibles
    const { Id, Nombre, Modelo, Precio, Imagen } = producto;
    const productoSeguro = { Id, Nombre, Modelo, Precio, Imagen };

    // Respuesta segura
    res.json(productoSeguro);

  } catch (error) {
    // Manejo de errores genérico sin exponer detalles internos
    console.error('Error al obtener el producto:', error);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};
// Crear un registro

export const createProducto = async (req, res) => {
  try {
    await ProductoModel.create(req.body)
    res.json({ "message": "Registro Completado con éxito" })
  } catch (error) {
    res.json({ message: error.message })
  }
};

// Actualizar un registro
export const updateProducto = async (req, res) => {
  try {
    const producto3 = await ProductoModel.update(
      {
        Categoria: req.body.Categoria,
        Precio: req.body.Precio,
        ExistenciasDisponibles: req.body.ExistenciasDisponibles,
        Img: req.body.Img,
        IdentificadorFiscalProvedor: req.body.IdentificadorFiscalProvedor
      },

      {
        where: { modelo: req.params.modelo }
      });
    res.json({ "message": "Registro actualizado con éxito" })
  } catch (error) {
    res.json({ message: error.message })
  }
};

// Eliminar un registro
export const deleteProducto = async (req, res) => {
  try {
    await ProductoModel.destroy({
      where: { Modelo: req.params.modelo }
    })
    res.json({ "message": "Registro actualizado con éxito" })
  } catch (error) {
    res.json({ message: error.message })
  }
};

//
