/**
 * Data Access Object (DAO): ReservaDAO
 * Maneja el acceso a los datos de reservas usando PostgreSQL
 * Utiliza la librería pg y variables de entorno para la conexión
 */

const { Pool } = require('pg');
const Reserva = require('../domain/Reserva');

class ReservaDAO {
  constructor() {
    // Configurar pool de conexiones desde variables de entorno
    this.pool = new Pool({
      user: process.env.DB_USER || 'reservas_user',
      password: process.env.DB_PASSWORD || 'password123',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || 'reservas_db',
    });

    // Manejar errores de conexión
    this.pool.on('error', (err) => {
      console.error('Error inesperado en el pool de conexiones', err);
    });

    // Inicializar datos de prueba
    this._inicializarDatos();
  }

  /**
   * Inicializa datos de prueba si la tabla está vacía
   * Se ejecuta automáticamente al instanciar el DAO
   */
  async _inicializarDatos() {
    try {
      const resultado = await this.pool.query('SELECT COUNT(*) FROM reservas');
      const count = parseInt(resultado.rows[0].count, 10);

      // Solo insertar si la tabla está vacía
      if (count === 0) {
        console.log('📝 Insertando datos de prueba...');
        
        const datosEjemplo = [
          {
            nombre_cliente: 'Juan García',
            fecha: '2026-05-10',
            hora: '12:30:00',
            comensales: 4,
            es_domingo: false,
            pago_seña: true,
            estado: 'confirmada'
          },
          {
            nombre_cliente: 'María López',
            fecha: '2026-05-11',
            hora: '20:00:00',
            comensales: 2,
            es_domingo: false,
            pago_seña: true,
            estado: 'confirmada'
          },
          {
            nombre_cliente: 'Carlos Rodríguez',
            fecha: '2026-05-12',
            hora: '13:00:00',
            comensales: 8,
            es_domingo: true,
            pago_seña: false,
            estado: 'pendiente'
          }
        ];

        for (const dato of datosEjemplo) {
          await this.pool.query(
            `INSERT INTO reservas (nombre_cliente, fecha, hora, comensales, es_domingo, pago_seña, estado)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [dato.nombre_cliente, dato.fecha, dato.hora, dato.comensales, dato.es_domingo, dato.pago_seña, dato.estado]
          );
        }

        console.log('✅ Datos de prueba insertados exitosamente');
      }
    } catch (error) {
      console.warn('⚠️  No se pudieron insertar datos de prueba (posiblemente ya existen):', error.message);
    }
  }

  /**
   * Mapea un registro de BD a un objeto Reserva
   * @param {Object} registro - Fila de la BD
   * @returns {Reserva} Objeto Reserva
   */
  _mapearAReserva(registro) {
    return new Reserva(
      registro.id,
      registro.nombre_cliente,
      registro.fecha,
      registro.hora,
      registro.comensales,
      registro.es_domingo,
      registro.pago_seña,
      registro.estado
    );
  }

  /**
   * Obtiene todas las reservas
   * @returns {Promise<Array>} Array de reservas
   */
  async obtenerTodas() {
    try {
      const resultado = await this.pool.query(
        'SELECT id, nombre_cliente, fecha, hora, comensales, es_domingo, pago_seña, estado FROM reservas ORDER BY fecha DESC, hora DESC'
      );
      return resultado.rows.map(r => this._mapearAReserva(r).toJSON());
    } catch (error) {
      console.error('Error en obtenerTodas:', error);
      throw new Error('Error al obtener las reservas de la BD');
    }
  }

  /**
   * Obtiene una reserva por ID
   * @param {number} id - ID de la reserva
   * @returns {Promise<Object|null>} Reserva encontrada o null
   */
  async obtenerPorId(id) {
    try {
      const resultado = await this.pool.query(
        'SELECT id, nombre_cliente, fecha, hora, comensales, es_domingo, pago_seña, estado FROM reservas WHERE id = $1',
        [id]
      );
      
      if (resultado.rows.length === 0) {
        return null;
      }

      return this._mapearAReserva(resultado.rows[0]).toJSON();
    } catch (error) {
      console.error('Error en obtenerPorId:', error);
      throw new Error('Error al obtener la reserva de la BD');
    }
  }

  /**
   * Crea una nueva reserva
   * @param {Reserva} reserva - Objeto Reserva a crear
   * @returns {Promise<Object>} Reserva creada con ID
   */
  async crear(reserva) {
    try {
      const resultado = await this.pool.query(
        `INSERT INTO reservas (nombre_cliente, fecha, hora, comensales, es_domingo, pago_seña, estado)
         VALUES ($1, $2, $3, $4, $5, $6,$7 )
         RETURNING id, nombre_cliente, fecha, hora, comensales, es_domingo, pago_seña, estado`,
        [
          reserva.nombreCliente,
          reserva.fecha,
          reserva.hora,
          reserva.comensales,
          reserva.esDomingo,
          reserva.pagoSeña,
          reserva.estado
        ]
      );

      return this._mapearAReserva(resultado.rows[0]).toJSON();
    } catch (error) {
      console.error('Error en crear:', error);
      throw new Error('Error al crear la reserva en la BD');
    }
  }

  /**
   * Actualiza una reserva existente
   * @param {number} id - ID de la reserva
   * @param {Object} datos - Datos a actualizar
   * @returns {Promise<Object|null>} Reserva actualizada o null
   */
  async actualizar(id, datos) {
    try {
      // Construir dinámicamente la query con solo los campos que se quieren actualizar
      const campos = [];
      const valores = [];
      let contador = 1;

      if (datos.nombreCliente !== undefined) {
        campos.push(`nombre_cliente = $${contador}`);
        valores.push(datos.nombreCliente);
        contador++;
      }
      if (datos.fecha !== undefined) {
        campos.push(`fecha = $${contador}`);
        valores.push(datos.fecha);
        contador++;
      }
      if (datos.hora !== undefined) {
        campos.push(`hora = $${contador}`);
        valores.push(datos.hora);
        contador++;
      }
      if (datos.comensales !== undefined) {
        campos.push(`comensales = $${contador}`);
        valores.push(datos.comensales);
        contador++;
      }
      if (datos.esDomingo !== undefined) {
        campos.push(`es_domingo = $${contador}`);
        valores.push(datos.esDomingo);
        contador++;
      }
      if (datos.pagoSeña !== undefined) {
        campos.push(`pago_seña = $${contador}`);
        valores.push(datos.pagoSeña);
        contador++;
      }
      if (datos.estado !== undefined) {
        campos.push(`estado = $${contador}`);
        valores.push(datos.estado);
        contador++;
      }

      if (campos.length === 0) {
        // Si no hay campos para actualizar, obtener la reserva actual
        return await this.obtenerPorId(id);
      }

      // Agregar updated_at
      campos.push(`updated_at = CURRENT_TIMESTAMP`);

      // Agregar el ID al final de los valores
      valores.push(id);

      const query = `UPDATE reservas SET ${campos.join(', ')} WHERE id = $${contador} RETURNING id, nombre_cliente, fecha, hora, comensales, es_domingo, pago_seña, estado`;

      const resultado = await this.pool.query(query, valores);

      if (resultado.rows.length === 0) {
        return null;
      }

      return this._mapearAReserva(resultado.rows[0]).toJSON();
    } catch (error) {
      console.error('Error en actualizar:', error);
      throw new Error('Error al actualizar la reserva en la BD');
    }
  }

  /**
   * Elimina una reserva por ID
   * @param {number} id - ID de la reserva
   * @returns {Promise<boolean>} true si se eliminó, false si no existe
   */
  async eliminar(id) {
    try {
      const resultado = await this.pool.query(
        'DELETE FROM reservas WHERE id = $1',
        [id]
      );

      return resultado.rowCount > 0;
    } catch (error) {
      console.error('Error en eliminar:', error);
      throw new Error('Error al eliminar la reserva de la BD');
    }
  }

  /**
   * Cierra el pool de conexiones
   * Usar cuando la aplicación se detiene
   */
  async cerrar() {
    await this.pool.end();
  }

  /**
   * Obtiene el total de comensales en una fecha específica
   * @param {string} fecha - Fecha a consultar (YYYY-MM-DD)
   * @returns {Promise<number>} Total de comensales confirmados
   */
  async obtenerTotalComendsalesPorFecha(fecha) {
    try {
      const resultado = await this.pool.query(
        'SELECT COALESCE(SUM(comensales), 0) as total FROM reservas WHERE fecha = $1 AND estado = $2',
        [fecha, 'confirmada']
      );

      return resultado.rows[0].total;
    } catch (error) {
      console.error('Error en obtenerTotalComendsalesPorFecha:', error);
      throw new Error('Error al obtener el total de comensales de la BD');
    }
  }
}

module.exports = ReservaDAO;
