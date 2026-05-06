# ╔════════════════════════════════════════════╗
#         🍽️  API de Reservas - Doña Tata                             
#          Restaurante Tenedor Libre Argentino                          
# ╚════════════════════════════════════════════╝

API REST para gestión de reservas de un restaurante, desarrollada con **Express.js**, **PostgreSQL** y **Docker**.

## 📋 Descripción del Proyecto

Aplicación MVC (Model-View-Controller) con arquitectura en capas:

- **Controllers**: Lógica de manejo de requests/responses
- **Services**: Lógica de negocio
- **DAO (Data Access Object)**: Acceso a datos con PostgreSQL
- **Domain Models**: Modelos de dominio con validaciones

## 🏗️ Estructura del Proyecto

```
tp_estructura_mvc/
├── src/
│   ├── app.js                      # Punto de entrada de Express
│   ├── config/
│   │   └── constants.js            # Constantes de la aplicación
│   ├── controllers/
│   │   └── ReservaController.js   # Controlador de reservas
│   ├── dao/
│   │   └── ReservaDAO.js          # Acceso a datos (PostgreSQL)
│   ├── domain/
│   │   └── Reserva.js             # Modelo de dominio
│   ├── routes/
│   │   └── reservas.js            # Rutas de la API
│   └── services/
│       └── ReservaService.js      # Lógica de negocio
├── Dockerfile                      # Configuración Docker
├── docker-compose.yml              # Orquestación de contenedores
├── init.sql                        # Script de inicialización de BD
├── .env.example                    # Variables de entorno (ejemplo)
├── package.json                    # Dependencias del proyecto
└── README.md                       # Este archivo
```


## Patrón MVC

El patrón **Model-View-Controller** separa la aplicación en tres componentes:

```
┌─────────────────────────────────────────────┐
│          Solicitud HTTP (GET/POST)          │
└────────────────┬────────────────────────────┘
                 │
                 ▼
        ┌─────────────────┐
        │   CONTROLLER    │ ← Recibe y valida entrada
        │ (Request/Response)
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │    SERVICE      │ ← Lógica de negocio
        │ (Business Logic)│
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │      DAO        │ ← Acceso a datos
        │ (Data Access)   │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │    DOMAIN       │ ← Modelos del negocio
        │   (Models)      │
        └─────────────────┘
```



### Instalación

#### `.env` (Crear desde `.env.example`)

```bash
cp .env.example .env
```

Edita `.env` con tus valores:

```env
# PostgreSQL
DB_HOST=database
DB_PORT=5432
DB_USER=reservas_user
DB_PASSWORD=password123
DB_NAME=reservas_db

# Node.js / Express
PORT=3000
NODE_ENV=production
```

### Construcción e Inicio

#### 1. Levantar los contenedores

```bash
docker-compose up --build
```


## 🧪 Pruebas de la API

### Con CURL

#### Obtener todas las reservas

```bash
curl http://localhost:3000/api/reservas
```

#### Obtener reserva por ID

```bash
curl http://localhost:3000/api/reservas/1
```

#### Crear una reserva

```bash
curl -X POST http://localhost:3000/api/reservas \
  -H "Content-Type: application/json" \
  -d '{
    "nombreCliente": "Franco García",
    "fecha": "2026-05-20",
    "hora": "19:30",
    "comensales": 4,
    "esDomingo": false,
    "pagoSeña": true,
    "estado": "confirmada"
  }'
```

#### Actualizar una reserva

```bash
curl -X PUT http://localhost:3000/api/reservas/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombreCliente": "Franco García Actualizado",
    "comensales": 5
  }'
```

#### Eliminar una reserva

```bash
curl -X DELETE http://localhost:3000/api/reservas/1
```

## 👤 Autor

Franco Torrico - 2do Año Software POO

