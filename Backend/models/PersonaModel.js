import db from '../database/db.js'

import { DataTypes } from 'sequelize'
const PersonaModel = db.define('Persona', {
    Cedula: {type: DataTypes.INTEGER, primaryKey: true},
    Nombre: {type: DataTypes.STRING},
    PrimerApellido: {type: DataTypes.STRING},
    SegundoApellido: {type: DataTypes.STRING},
    Email: {type: DataTypes.STRING}
});

export default PersonaModel;