/**
 * Routes: Reservas
 * Define todos los endpoints para el manejo de reservas
 */

const express = require('express');
const ReservaController = require('../controllers/ReservaController');

const router = express.Router();
const controller = new ReservaController();

/**
 * GET /api/reservas
 * Obtiene todas las reservas
 */
router.get('/', (req, res) => controller.obtenerTodas(req, res));

/**
 * GET /api/reservas/:id
 * Obtiene una reserva por ID
 */
router.get('/:id', (req, res) => controller.obtenerPorId(req, res));

/**
 * POST /api/reservas
 * Crea una nueva reserva
 */
router.post('/', (req, res) => controller.crear(req, res));

/**
 * PUT /api/reservas/:id
 * Actualiza una reserva existente
 */
router.put('/:id', (req, res) => controller.actualizar(req, res));

/**
 * DELETE /api/reservas/:id
 * Cancela una reserva
 */
router.delete('/:id', (req, res) => controller.cancelar(req, res));

module.exports = router;
