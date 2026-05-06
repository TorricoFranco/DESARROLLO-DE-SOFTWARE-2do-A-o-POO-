/**
 * Configuración y Constantes de la Aplicación
 * Centraliza todos los valores configurables
 */

module.exports = {
  // ========== CONFIGURACIÓN DEL SERVIDOR ==========
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // ========== CONSTANTES DE NEGOCIO ==========
  RESERVAS: {
    CAPACIDAD_MAXIMA_SALON: 50,
    COMENSALES_DOMINGO_FAMILIAR: 6,
    
    HORARIOS_PERMITIDOS: [
      { nombre: 'Almuerzo', inicio: '12:00', fin: '15:00' },
      { nombre: 'Cena', inicio: '20:00', fin: '23:30' }
    ],

    ESTADOS: {
      CONFIRMADA: 'confirmada',
      PENDIENTE: 'pendiente',
      CANCELADA: 'cancelada'
    },

    MENSAJES: {
      CREADA_EXITOSAMENTE: 'Reserva creada exitosamente',
      ACTUALIZADA_EXITOSAMENTE: 'Reserva actualizada exitosamente',
      CANCELADA_EXITOSAMENTE: 'Reserva cancelada exitosamente',
      NO_ENCONTRADA: 'Reserva no encontrada',
      HORARIO_NO_PERMITIDO: 'Horario no permitido. Horarios disponibles: 12:00-15:00 y 20:00-23:30',
      CAPACIDAD_EXCEDIDA: 'No hay capacidad disponible para esa fecha',
      SENA_REQUERIDA: 'Para domingos con más de 6 comensales es obligatorio el pago de seña'
    }
  },

  // ========== CÓDIGOS DE RESPUESTA HTTP ==========
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500
  },

  // ========== VALIDACIÓN ==========
  VALIDACION: {
    NOMBRE_MIN_LENGTH: 2,
    NOMBRE_MAX_LENGTH: 100,
    ID_MIN: 1,
    COMENSALES_MIN: 1,
    COMENSALES_MAX: 50
  },

  // ========== INFORMACIÓN DE LA APLICACIÓN ==========
  APP: {
    NOMBRE: 'API de Reservas - Doña Tata',
    VERSION: '1.0.0',
    DESCRIPCION: 'Sistema de gestión de reservas para restaurante Tenedor Libre argentino',
    EMOJI: '🍽️',
    PAIS: '🇦🇷'
  }
};
