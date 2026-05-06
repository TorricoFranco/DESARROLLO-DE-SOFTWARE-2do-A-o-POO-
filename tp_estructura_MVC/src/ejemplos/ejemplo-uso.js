/**
 * Ejemplos de Uso de la API Doña Tata
 * 
 * Ejecutar: node src/ejemplos/ejemplo-uso.js
 * 
 * NOTA: La API debe estar corriendo en http://localhost:3000
 */

const http = require('http');

// Configuración
const API_URL = 'http://localhost:3000';

// ============================================
// HELPER: Función para hacer peticiones HTTP
// ============================================
function hacerPeticion(metodo, ruta, datos = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(API_URL + ruta);
    const opciones = {
      hostname: url.hostname,
      port: url.port || 80,
      path: url.pathname + url.search,
      method: metodo,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(opciones, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            body: JSON.parse(data)
          });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', reject);
    if (datos) req.write(JSON.stringify(datos));
    req.end();
  });
}

// ============================================
// EJEMPLOS
// ============================================

async function ejecutarEjemplos() {
  console.log('\n🍽️  EJEMPLOS DE USO - API DOÑA TATA\n');
  console.log('========================================\n');

  try {
    // EJEMPLO 1: Obtener todas las reservas
    console.log('1️⃣  OBTENER TODAS LAS RESERVAS');
    console.log('─'.repeat(40));
    const respuesta1 = await hacerPeticion('GET', '/api/reservas');
    console.log('Status:', respuesta1.status);
    console.log('Cantidad de reservas:', respuesta1.body.datos.length);
    console.log('Primera reserva:', respuesta1.body.datos[0].nombreCliente);
    console.log('');

    // EJEMPLO 2: Obtener reserva por ID
    console.log('2️⃣  OBTENER RESERVA POR ID');
    console.log('─'.repeat(40));
    const respuesta2 = await hacerPeticion('GET', '/api/reservas/1');
    console.log('Status:', respuesta2.status);
    console.log('Reserva encontrada:', respuesta2.body.datos.nombreCliente);
    console.log('');

    // EJEMPLO 3: Crear reserva simple
    console.log('3️⃣  CREAR RESERVA SIMPLE');
    console.log('─'.repeat(40));
    const nuevaReserva = {
      nombreCliente: 'Rosa Martínez',
      fecha: '2026-05-20',
      hora: '20:30',
      comensales: 2,
      esDomingo: false,
      pagoSeña: true
    };
    const respuesta3 = await hacerPeticion('POST', '/api/reservas', nuevaReserva);
    console.log('Status:', respuesta3.status);
    console.log('ID creado:', respuesta3.body.datos.id);
    console.log('Cliente:', respuesta3.body.datos.nombreCliente);
    console.log('Estado:', respuesta3.body.datos.estado);
    console.log('');

    // EJEMPLO 4: Crear domingo familiar CON seña
    console.log('4️⃣  CREAR DOMINGO FAMILIAR (CON SEÑA)');
    console.log('─'.repeat(40));
    const domingoConSena = {
      nombreCliente: 'Familia González',
      fecha: '2026-05-25',
      hora: '13:00',
      comensales: 10,
      esDomingo: true,
      pagoSeña: true
    };
    const respuesta4 = await hacerPeticion('POST', '/api/reservas', domingoConSena);
    console.log('Status:', respuesta4.status);
    console.log('ID creado:', respuesta4.body.datos.id);
    console.log('Cliente:', respuesta4.body.datos.nombreCliente);
    console.log('Estado:', respuesta4.body.datos.estado, '✅');
    console.log('');

    // EJEMPLO 5: Intentar domingo SIN seña (error esperado)
    console.log('5️⃣  INTENTAR DOMINGO SIN SEÑA (ERROR ESPERADO)');
    console.log('─'.repeat(40));
    const domingoSinSena = {
      nombreCliente: 'Familia López',
      fecha: '2026-05-25',
      hora: '12:00',
      comensales: 8,
      esDomingo: true,
      pagoSeña: false
    };
    const respuesta5 = await hacerPeticion('POST', '/api/reservas', domingoSinSena);
    console.log('Status:', respuesta5.status, '❌');
    console.log('Error:', respuesta5.body.error);
    console.log('');

    // EJEMPLO 6: Horario no permitido
    console.log('6️⃣  HORARIO NO PERMITIDO (ERROR ESPERADO)');
    console.log('─'.repeat(40));
    const horarioInvalido = {
      nombreCliente: 'Juan Pérez',
      fecha: '2026-05-20',
      hora: '17:00', // Entre las 2 franjas
      comensales: 4,
      esDomingo: false,
      pagoSeña: true
    };
    const respuesta6 = await hacerPeticion('POST', '/api/reservas', horarioInvalido);
    console.log('Status:', respuesta6.status, '❌');
    console.log('Error:', respuesta6.body.error);
    console.log('');

    // EJEMPLO 7: Actualizar reserva
    console.log('7️⃣  ACTUALIZAR RESERVA');
    console.log('─'.repeat(40));
    const actualizacion = {
      comensales: 5,
      hora: '21:00'
    };
    const respuesta7 = await hacerPeticion('PUT', '/api/reservas/1', actualizacion);
    console.log('Status:', respuesta7.status);
    console.log('Nuevo comensales:', respuesta7.body.datos.comensales);
    console.log('Nueva hora:', respuesta7.body.datos.hora);
    console.log('');

    // EJEMPLO 8: Cancelar reserva
    console.log('8️⃣  CANCELAR RESERVA');
    console.log('─'.repeat(40));
    const respuesta8 = await hacerPeticion('DELETE', '/api/reservas/3');
    console.log('Status:', respuesta8.status);
    console.log('Nuevo estado:', respuesta8.body.datos.estado);
    console.log('');

    // EJEMPLO 9: Verificar reserva cancelada
    console.log('9️⃣  VERIFICAR RESERVA CANCELADA');
    console.log('─'.repeat(40));
    const respuesta9 = await hacerPeticion('GET', '/api/reservas/3');
    console.log('Status:', respuesta9.status);
    console.log('Estado:', respuesta9.body.datos.estado);
    console.log('');

    // RESUMEN
    console.log('========================================');
    console.log('✅ TODOS LOS EJEMPLOS EJECUTADOS');
    console.log('========================================\n');

  } catch (error) {
    console.error('❌ Error al ejecutar ejemplos:');
    console.error(error.message);
    console.error('\n💡 Asegúrate de que la API está corriendo:');
    console.error('   npm run dev');
  }
}

// Ejecutar
ejecutarEjemplos();
