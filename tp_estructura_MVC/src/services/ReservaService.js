/**
 * Service Layer: ReservaService
 * Contiene la lógica de negocio y reglas específicas argentinas
 * Orquesta operaciones entre DAO y validaciones
 */

const Reserva = require('../domain/Reserva');
const ReservaDAO = require('../dao/ReservaDAO');

class ReservaService {
  constructor() {
    this.dao = new ReservaDAO();
  }

  /**
   * Constantes de negocio
   */
  static CAPACIDAD_MAXIMA_SALON = 50;
  static COMENSALES_DOMINGO_FAMILIAR = 6;
  static HORARIOS_PERMITIDOS = [
    { inicio: '12:00', fin: '15:00' },
    { inicio: '20:00', fin: '23:30' }
  ];

  /**
   * Obtiene todas las reservas
   */
  async obtenerTodas() {
    try {
      return await this.dao.obtenerTodas();
    } catch (error) {
      throw new Error(`Error al obtener reservas: ${error.message}`);
    }
  }

  /**
   * Obtiene una reserva por ID
   */
  async obtenerPorId(id) {
    try {
      if (!Number.isInteger(id) || id <= 0) {
        throw new Error('El ID debe ser un número entero positivo');
      }
      const reserva = await this.dao.obtenerPorId(id);
      if (!reserva) {
        throw new Error(`Reserva con ID ${id} no encontrada`);
      }
      return reserva;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Crea una nueva reserva con validaciones de negocio
   * Reglas argentinas aplicadas aquí
   */
  async crear(datos) {
    try {
      // Validación básica de datos
      const validacionBasica = this._validarDatosEntrada(datos);
      if (!validacionBasica.válido) {
        throw new Error(validacionBasica.errores.join(', '));
      }

      // Crear instancia de Reserva
      const reserva = new Reserva(
        null,
        datos.nombreCliente,
        datos.fecha,
        datos.hora,
        datos.comensales,
        datos.esDomingo,
        datos.pagoSeña || false,
        'pendiente' // Comienza como pendiente
      );

      // Validación del dominio
      const validacionDominio = reserva.validar();
      if (!validacionDominio.válido) {
        throw new Error(validacionDominio.errores.join(', '));
      }

      // Aplicar reglas de negocio
      await this._aplicarReglasNegocio(reserva);

      // Guardar en DAO
      const reservaCreada = await this.dao.crear(reserva);
      return reservaCreada;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Actualiza una reserva existente
   */
  async actualizar(id, datos) {
    try {
      if (!Number.isInteger(id) || id <= 0) {
        throw new Error('El ID debe ser un número entero positivo');
      }

      // Verificar que la reserva existe
      const reservaExistente = await this.dao.obtenerPorId(id);
      if (!reservaExistente) {
        throw new Error(`Reserva con ID ${id} no encontrada`);
      }

      // Validar datos de entrada
      if (Object.keys(datos).length === 0) {
        throw new Error('Debe proporcionar al menos un campo para actualizar');
      }

      const datosActualizados = { ...reservaExistente, ...datos };
      const reserva = new Reserva(
        id,
        datosActualizados.nombreCliente,
        datosActualizados.fecha,
        datosActualizados.hora,
        datosActualizados.comensales,
        datosActualizados.esDomingo,
        datosActualizados.pagoSeña,
        datosActualizados.estado
      );

      // Validación del dominio
      const validacionDominio = reserva.validar();
      if (!validacionDominio.válido) {
        throw new Error(validacionDominio.errores.join(', '));
      }

      // Aplicar reglas de negocio al actualizar
      await this._aplicarReglasNegocio(reserva);

      const reservaActualizada = await this.dao.actualizar(id, reserva);
      return reservaActualizada;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Cancela una reserva (eliminación lógica)
   */
  async cancelar(id) {
    try {
      if (!Number.isInteger(id) || id <= 0) {
        throw new Error('El ID debe ser un número entero positivo');
      }

      const reserva = await this.dao.obtenerPorId(id);
      if (!reserva) {
        throw new Error(`Reserva con ID ${id} no encontrada`);
      }

      const actualizada = await this.dao.actualizar(id, { estado: 'cancelada' });
      return actualizada;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Valida los datos de entrada
   */
  _validarDatosEntrada(datos) {
    const errores = [];

    if (!datos.nombreCliente || datos.nombreCliente.trim() === '') {
      errores.push('El nombre del cliente es requerido');
    }

    if (!datos.fecha) {
      errores.push('La fecha es requerida (formato: YYYY-MM-DD)');
    }

    if (!datos.hora) {
      errores.push('La hora es requerida (formato: HH:mm)');
    }

    if (!datos.comensales || !Number.isInteger(datos.comensales) || datos.comensales <= 0) {
      errores.push('El número de comensales debe ser un número entero positivo');
    }

    if (typeof datos.esDomingo !== 'boolean') {
      errores.push('esDomingo debe ser un valor booleano');
    }

    return {
      válido: errores.length === 0,
      errores
    };
  }

  /**
   * Aplica las reglas de negocio específicas del dominio
   */
  async _aplicarReglasNegocio(reserva) {
    // Validar horario permitido
    if (!this._validarHorarioPermitido(reserva.hora)) {
      throw new Error(
        `Horario no permitido. Horarios disponibles: 12:00-15:00 y 20:00-23:30`
      );
    }

    // Validar capacidad máxima del salón
    const totalComendsales = await this.dao.obtenerTotalComendsalesPorFecha(reserva.fecha);
    if (totalComendsales + reserva.comensales > ReservaService.CAPACIDAD_MAXIMA_SALON) {
      throw new Error(
        `No hay capacidad disponible para esa fecha. ` +
        `Comensales confirmados: ${totalComendsales}. ` +
        `Capacidad máxima del salón: ${ReservaService.CAPACIDAD_MAXIMA_SALON}`
      );
    }

    // La Seña del Domingo Familiar
    if (reserva.esDomingo && reserva.comensales > ReservaService.COMENSALES_DOMINGO_FAMILIAR) {
      if (!reserva.pagoSeña) {
        reserva.estado = 'pendiente';
        throw new Error(
          `Para domingos con más de ${ReservaService.COMENSALES_DOMINGO_FAMILIAR} comensales ` +
          `es obligatorio el pago de seña. Reserva quedará en estado "pendiente".`
        );
      } else {
        reserva.estado = 'confirmada';
      }
    } else {
      // Si no es domingo familiar o no aplica la regla, confirmar automáticamente
      reserva.estado = 'confirmada';
    }
  }

  /**
   * Valida si la hora está dentro de los horarios permitidos
   */
  _validarHorarioPermitido(hora) {
    return ReservaService.HORARIOS_PERMITIDOS.some(horario => {
      return hora >= horario.inicio && hora <= horario.fin;
    });
  }
}

module.exports = ReservaService;
