use iconiccaps;

DELIMITER //

CREATE FUNCTION getContrasenaByUsuario(usuario VARCHAR(25)) RETURNS VARCHAR(35)
    READS SQL DATA
BEGIN
    DECLARE contrasena VARCHAR(35);
    SELECT Cliente.Contrasena INTO contrasena FROM Cliente WHERE Cliente.Usuario = usuario;
    RETURN contrasena;
END //

DELIMITER ;


SELECT getContrasenaByUsuario('nombre_usuario');