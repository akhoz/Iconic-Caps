import ClienteModel from "../models/ClienteModel.js";
import ComentarioModel from "../models/ComentarioModel.js";
import ProductoModel from "../models/ProductoModel.js";

export const getAllComentarios = async (req, res) => {
  try {
    const comentarios = await ComentarioModel.findAll({
      include: [{ model: ProductoModel }, { model: ClienteModel }],
    });
    res.json(comentarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Comentarios por modelo
export const getComentarioByModel = async (req, res) => {
  try {
    const comentarios = await ComentarioModel.findAll({
      where: {
        ModeloProducto: req.params.ModeloProducto,
      },
      include: [{ model: ProductoModel }, { model: ClienteModel }],
    });
    res.json(comentarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Comentarios por cédula
export const getComentarioByCedula = async (req, res) => {
  try {
    const comentarios = await ComentarioModel.findAll({
      where: {
        CedulaCliente: req.params.CedulaCliente,
      },
      include: [{ model: ProductoModel }, { model: ClienteModel }],
    });
    res.json(comentarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Comentario por Id
export const getCometarioById = async (req, res) => {
  try {
    const comentario = await ComentarioModel.findOne({
      where: {
        IdComentario: req.params.IdComentario,
      },
    });
    res.json(comentario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔒 Crear comentario con validación de estrellas (1–5)
export const createComentario = async (req, res) => {
  try {
    const {
      Estrellas,
      Comentario,
      Fecha,
      Hora,
      ModeloProducto,
      CedulaCliente,
    } = req.body;

    const estrellasNumber = parseInt(Estrellas, 10);

    if (
      !Number.isInteger(estrellasNumber) ||
      estrellasNumber < 1 ||
      estrellasNumber > 5
    ) {
      return res
        .status(400)
        .json({
          message: "El campo 'Estrellas' debe ser un número entero entre 1 y 5.",
        });
    }

    await ComentarioModel.create({
      Estrellas: estrellasNumber,
      Comentario,
      Fecha,
      Hora,
      ModeloProducto,
      CedulaCliente,
    });

    res.json("Comentario creado con éxito");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// 🔒 Actualizar comentario con validación de estrellas (1–5)
export const updateComentario = async (req, res) => {
  try {
    const { Estrellas, Comentario } = req.body;

    let dataToUpdate = {};

    if (Comentario !== undefined) {
      dataToUpdate.Comentario = Comentario;
    }

    if (Estrellas !== undefined) {
      const estrellasNumber = parseInt(Estrellas, 10);

      if (
        !Number.isInteger(estrellasNumber) ||
        estrellasNumber < 1 ||
        estrellasNumber > 5
      ) {
        return res
          .status(400)
          .json({
            message:
              "El campo 'Estrellas' debe ser un número entero entre 1 y 5.",
          });
      }

      dataToUpdate.Estrellas = estrellasNumber;
    }

    await ComentarioModel.update(dataToUpdate, {
      where: {
        IdComentario: req.params.IdComentario,
      },
    });

    res.json("Comentario actualizado");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteComentario = async (req, res) => {
  try {
    await ComentarioModel.destroy({
      where: {
        IdComentario: req.params.IdComentario,
      },
    });
    res.json("Eliminado con éxito");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
