
import PersonaModel from "../models/PersonaModel.js";

// Crear una persona
export const createPersona = async (req, res) => {
    try {
        await PersonaModel.create(req.body)
        res.json({"message" : "Registro Completado con éxito" })
    } catch (error) {
        res.json({message: error.message})
    }
};

