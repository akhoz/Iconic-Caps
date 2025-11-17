import {
  getInformacionPedidosByCliente, getProductosCompradosByCliente, crearPedido, obtenerVista, getAllViews,
  getCantidadComprasPorProducto, getPedidosPendientes
} from '../queries.js';
import { generatePdf } from '../generatePdf.js';

export const obtenerInformacionPedidos = async (req, res) => {
  try {
    const { CedulaClienteConsultado } = req.params;
    const cedulaToken = String(req.user.sub);
    const isAdmin = !!req.user?.Admin; // <- tu token usa 'Admin' (mayúscula)

    // Anti-BOLA: si NO es admin y pide otra cédula, bloquear
    if (!isAdmin && String(CedulaClienteConsultado) !== cedulaToken) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Si es admin, usa la cédula pedida; si no, la del token
    const cedulaEfectiva = isAdmin ? String(CedulaClienteConsultado) : cedulaToken;

    const rows = await getInformacionPedidosByCliente(cedulaEfectiva);
    return res.json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener pedidos' });
  }
};

export const obtenerProductosComprados = async (req, res) => {
  const { CedulaClienteConsultado } = req.params;

  try {
    const productos = await getProductosCompradosByCliente(CedulaClienteConsultado);
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos comprados' });
  }
};

export const crearNuevoPedido = async (req, res) => {
  const { porcentajeGarantia, direccionIngresada } = req.body;
  const cedulaToken = String(req.user.sub); // <-- sacada del token

  if (!cedulaToken) {
    return res.status(401).json({ error: 'No se pudo obtener la cédula desde el token' });
  }

  try {
    const nuevaFactura = await crearPedido(
      cedulaToken,
      porcentajeGarantia,
      direccionIngresada
    );
    res.status(201).json({ NumeroFactura: nuevaFactura });
  } catch (error) {
    console.error('Error al crear pedido:', error);
    res.status(500).json({ error: 'Error al crear el pedido' });
  }
};


export const obtenerDatosDesdeVista = async (req, res) => {
  const { vista } = req.params;

  try {
    const datos = await obtenerVista(vista);
    res.status(200).json(datos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos desde la vista' });
  }
};


export const generarPdfConVistas = async (req, res) => {
  try {
    const vistas = await getAllViews();
    const data = {};

    for (const vista of vistas) {
      data[vista] = await obtenerVista(vista);
    }

    await generatePdf(vistas, data);

    res.download('VistasDatos.pdf', 'VistasDatos.pdf', (err) => {
      if (err) {
        res.status(500).json({ error: 'Error al descargar el PDF' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al generar el PDF' });
  }
};

export const obtenerCantidadComprasPorProducto = async (req, res) => {
  try {
    const resultados = await getCantidadComprasPorProducto();
    res.status(200).json(resultados);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
};

export const obtenerPedidosPendientes = async (req, res) => {
  try {
    const pedidos = await getPedidosPendientes();
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los pedidos pendientes' });
  }
};
