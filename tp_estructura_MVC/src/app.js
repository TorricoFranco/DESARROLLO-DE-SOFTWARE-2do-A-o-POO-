/**
 * Aplicación Principal: Express Server
 * Configuración y punto de entrada de la API
 */

// Cargar variables de entorno
require('dotenv').config();

const express = require('express');
const reservasRouter = require('./routes/reservas');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Rutas
app.use('/api/reservas', reservasRouter);

// Ruta raíz
app.get('/', (req, res) => {
  res.status(200).json({
    mensaje: 'Bienvenido a la API de Reservas - Doña Tata 🇦🇷',
    versión: '1.0.0',
    endpoints: {
      obtenerTodas: 'GET /api/reservas',
      obtenerPorId: 'GET /api/reservas/:id',
      crear: 'POST /api/reservas',
      actualizar: 'PUT /api/reservas/:id',
      cancelar: 'DELETE /api/reservas/:id'
    }
  });
});

// Ruta 404
app.use((req, res) => {
  res.status(404).json({
    éxito: false,
    mensaje: 'Endpoint no encontrado',
    ruta: req.path,
    método: req.method
  });
});

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    éxito: false,
    mensaje: 'Error interno del servidor',
    error: err.message
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║   🍽️  API de Reservas - Doña Tata         ║║
╚════════════════════════════════════════════╝
  
  Servidor escuchando en: http://localhost:${PORT}
  Ambiente: ${process.env.NODE_ENV || 'development'}
  
  Endpoints disponibles:
  • GET  /api/reservas              - Obtener todas
  • GET  /api/reservas/:id          - Obtener por ID
  • POST /api/reservas              - Crear nueva
  • PUT  /api/reservas/:id          - Actualizar
  • DELETE /api/reservas/:id        - Cancelar
  
  Prueba en: http://localhost:${PORT}
  ════════════════════════════════════════════
  `);
});

module.exports = app;
