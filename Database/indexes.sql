use iconiccaps;

-- Indice para los estados de los pedidos
CREATE INDEX idx_estado_envio ON envioxpedido(Estado);

-- Indice para el numero de sucursal asignada en los empleados
CREATE INDEX idx_sucursal_asignada ON empleado(NumeroSucursalAsignada);

-- Indice para las estrellas de un comentario
CREATE INDEX idx_estrellas_comentario ON comentario(Estrellas);

-- Indice para las existencias disponibles de los productos
CREATE INDEX idx_existencias_disponibles_producto ON producto(ExistenciasDisponibles);

-- Indice para las marcas de los productos (quien las provee)
CREATE INDEX idx_provedor_producto ON provedor(NombreEmpresa);