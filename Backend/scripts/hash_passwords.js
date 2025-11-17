// scripts/hash_passwords.js
import bcrypt from 'bcrypt';
import db from '../database/db.js';
import ClienteModel from '../models/ClienteModel.js';

const SALT_ROUNDS = 10;

const run = async () => {
  try {
    console.log('🔄 Conectando a la base de datos...');
    await db.authenticate();

    const clientes = await ClienteModel.findAll();
    console.log(`🧾 Se encontraron ${clientes.length} clientes.`);

    for (const cliente of clientes) {
      const plain = cliente.Contrasena;

      // Si ya está hasheada, saltar
      if (!plain || plain.startsWith('$2b$') || plain.startsWith('$2a$')) {
        console.log(`➡️  ${cliente.Usuario}: ya está hasheada`);
        continue;
      }

      // Generar hash y actualizar
      const hash = await bcrypt.hash(plain, SALT_ROUNDS);
      cliente.Contrasena = hash;
      await cliente.save();

      console.log(`✅ ${cliente.Usuario}: contraseña convertida`);
    }

    console.log('🎉 Todas las contraseñas han sido hasheadas correctamente.');
    await db.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error al convertir contraseñas:', err);
    process.exit(1);
  }
};

run();
