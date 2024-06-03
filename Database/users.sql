use iconiccaps;

-- Super usuario
CREATE USER super_usuario@localhost IDENTIFIED BY 'super';
GRANT ALL PRIVILEGES ON iconiccaps.* TO super_usuario@localhost;

-- Usuario normal (tablas y funciones)
CREATE USER usuario_normal@localhost IDENTIFIED BY 'normal';
GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE ON iconiccaps.* TO usuario_normal@localhost;

-- Usuaio de respaldo
CREATE USER usuario_respaldo@localhost IDENTIFIED BY 'respaldo';
GRANT SELECT, SHOW VIEW, LOCK TABLES ON iconiccaps.* TO usuario_respaldo@localhost;

SHOW GRANTS FOR super_usuario@localhost;
SHOW GRANTS FOR usuario_normal@localhost;
SHOW GRANTS FOR usuario_respaldo@localhost;

