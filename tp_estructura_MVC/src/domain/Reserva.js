/**
 * Domain Model: Reserva
 * Representa la entidad principal del sistema de reservas
 * Contiene la lógica de validación de dominio
 */

class Reserva {
  constructor(id, nombreCliente, fecha, hora, comensales, esDomingo, pagoSeña = false, estado = 'pendiente') {
    this.id = id;
    this.nombreCliente = nombreCliente;
    this.fecha = fecha;
    this.hora = hora;
    this.comensales = comensales;
    this.esDomingo = esDomingo;
    this.pagoSeña = pagoSeña;
    this.estado = estado; // 'confirmada' o 'pendiente'
  }

  /**
   * Valida que la reserva cumpla con las reglas de dominio básicas
   * @returns {Object} { válido: boolean, errores: array }
   */
  validar() {
    const errores = [];

    if (!this.nombreCliente || this.nombreCliente.trim() === '') {
      errores.push('El nombre del cliente es requerido');
    }

    if (!this.fecha) {
      errores.push('La fecha es requerida');
    }

    if (!this.hora) {
      errores.push('La hora es requerida');
    }

    if (!this.comensales || this.comensales <= 0) {
      errores.push('El número de comensales debe ser mayor a 0');
    }

    if (typeof this.esDomingo !== 'boolean') {
      errores.push('esDomingo debe ser un valor booleano');
    }

    if (!['confirmada', 'pendiente'].includes(this.estado)) {
      errores.push('El estado debe ser "confirmada" o "pendiente"');
    }

    return {
      válido: errores.length === 0,
      errores
    };
  }

  /**
   * Obtiene la representación del objeto para respuesta JSON
   */
  toJSON() {
    return {
      id: this.id,
      nombreCliente: this.nombreCliente,
      fecha: this.fecha,
      hora: this.hora,
      comensales: this.comensales,
      esDomingo: this.esDomingo,
      pagoSeña: this.pagoSeña,
      estado: this.estado
    };
  }
}

module.exports = Reserva;
