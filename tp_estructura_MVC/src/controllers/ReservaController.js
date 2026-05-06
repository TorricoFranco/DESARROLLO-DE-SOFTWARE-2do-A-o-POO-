/**
 * Controller Layer: ReservaController
 * Maneja las solicitudes HTTP y respuestas
 * Valida entrada y formatea salida JSON
 */

const ReservaService = require('../services/ReservaService');

class ReservaController {
  constructor() {
    this.service = new ReservaService();
  }

  /**
   * GET /reservas
   * Obtiene todas las reservas
   */
  async obtenerTodas(req, res) {
    try {
      const reservas = await this.service.obtenerTodas();
      res.status(200).json({
        éxito: true,
        mensaje: `Se obtuvieron ${reservas.length} reservas`,
        datos: reservas
      });
    } catch (error) {
      res.status(500).json({
        éxito: false,
        mensaje: 'Error al obtener reservas',
        error: error.message
      });
    }
  }

  /**
   * GET /reservas/:id
   * Obtiene una reserva por ID
   */
  async obtenerPorId(req, res) {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id) || id <= 0) {
        return res.status(400).json({
          éxito: false,
          mensaje: 'El ID debe ser un número entero positivo'
        });
      }

      const reserva = await this.service.obtenerPorId(id);
      res.status(200).json({
        éxito: true,
        mensaje: 'Reserva encontrada',
        datos: reserva
      });
    } catch (error) {
      if (error.message.includes('no encontrada')) {
        return res.status(404).json({
          éxito: false,
          mensaje: error.message
        });
      }

      res.status(500).json({
        éxito: false,
        mensaje: 'Error al obtener la reserva',
        error: error.message
      });
    }
  }

  /**
   * POST /reservas
   * Crea una nueva reserva
   */
  async crear(req, res) {
    try {
      const { nombreCliente, fecha, hora, comensales, esDomingo, pagoSeña } = req.body;

      // Validación básica de entrada
      if (!nombreCliente || !fecha || !hora || comensales === undefined || esDomingo === undefined) {
        return res.status(400).json({
          éxito: false,
          mensaje: 'Faltan campos requeridos',
          requeridos: ['nombreCliente', 'fecha', 'hora', 'comensales', 'esDomingo'],
          opcionales: ['pagoSeña']
        });
      }

      const datos = {
        nombreCliente,
        fecha,
        hora,
        comensales,
        esDomingo,
        pagoSeña: pagoSeña || false
      };

      const reservaCreada = await this.service.crear(datos);

      res.status(201).json({
        éxito: true,
        mensaje: 'Reserva creada exitosamente',
        datos: reservaCreada
      });
    } catch (error) {
      res.status(400).json({
        éxito: false,
        mensaje: 'Error al crear la reserva',
        error: error.message
      });
    }
  }

  /**
   * PUT /reservas/:id
   * Actualiza una reserva existente
   */
  async actualizar(req, res) {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id) || id <= 0) {
        return res.status(400).json({
          éxito: false,
          mensaje: 'El ID debe ser un número entero positivo'
        });
      }

      const datos = req.body;

      // Al menos debe haber algo para actualizar
      if (Object.keys(datos).length === 0) {
        return res.status(400).json({
          éxito: false,
          mensaje: 'Debe proporcionar al menos un campo para actualizar'
        });
      }

      const reservaActualizada = await this.service.actualizar(id, datos);

      res.status(200).json({
        éxito: true,
        mensaje: 'Reserva actualizada exitosamente',
        datos: reservaActualizada
      });
    } catch (error) {
      if (error.message.includes('no encontrada')) {
        return res.status(404).json({
          éxito: false,
          mensaje: error.message
        });
      }

      res.status(400).json({
        éxito: false,
        mensaje: 'Error al actualizar la reserva',
        error: error.message
      });
    }
  }

  /**
   * DELETE /reservas/:id
   * Cancela una reserva
   */
  async cancelar(req, res) {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id) || id <= 0) {
        return res.status(400).json({
          éxito: false,
          mensaje: 'El ID debe ser un número entero positivo'
        });
      }

      const reservaCancelada = await this.service.cancelar(id);

      res.status(200).json({
        éxito: true,
        mensaje: 'Reserva cancelada exitosamente',
        datos: reservaCancelada
      });
    } catch (error) {
      if (error.message.includes('no encontrada')) {
        return res.status(404).json({
          éxito: false,
          mensaje: error.message
        });
      }

      res.status(400).json({
        éxito: false,
        mensaje: 'Error al cancelar la reserva',
        error: error.message
      });
    }
  }
}

module.exports = ReservaController;
