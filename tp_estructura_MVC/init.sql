-- Script de inicialización de base de datos
-- Crea la tabla de reservas automáticamente al iniciar PostgreSQL

CREATE TABLE IF NOT EXISTS reservas (
    id SERIAL PRIMARY KEY,
    nombre_cliente VARCHAR(100) NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    comensales INTEGER NOT NULL CHECK (comensales > 0),
    es_domingo BOOLEAN NOT NULL DEFAULT false,
    pago_seña BOOLEAN NOT NULL DEFAULT false,
    estado VARCHAR(50) NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('confirmada', 'pendiente', 'cancelada')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_fecha ON reservas(fecha);
CREATE INDEX IF NOT EXISTS idx_estado ON reservas(estado);

-- Datos iniciales de prueba (opcional)
INSERT INTO reservas (nombre_cliente, fecha, hora, comensales, es_domingo, pago_seña, estado)
VALUES 
    ('Juan García', '2026-05-10', '12:30:00', 4, false, true, 'confirmada'),
    ('María López', '2026-05-11', '20:00:00', 2, false, true, 'confirmada'),
    ('Carlos Rodríguez', '2026-05-12', '13:00:00', 8, true, false, 'pendiente')
ON CONFLICT DO NOTHING;

-- Crear tabla de auditoría (opcional)
CREATE TABLE IF NOT EXISTS auditorias (
    id SERIAL PRIMARY KEY,
    tabla VARCHAR(50) NOT NULL,
    operacion VARCHAR(10) NOT NULL,
    registro_id INTEGER NOT NULL,
    datos_anteriores JSONB,
    datos_nuevos JSONB,
    usuario VARCHAR(100),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
