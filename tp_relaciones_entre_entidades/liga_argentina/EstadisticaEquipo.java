package tp_der_liga_argentina.liga_argentina;

/**
 * Clase que mantiene las estadísticas de un equipo.
 * Atributos: partidos jugados, ganados, empatados, perdidos y puntos.
 * Incluye método para actualizar puntos (3 por victoria, 1 por empate).
 */
public class EstadisticaEquipo {
    private int partidosJugados;
    private int partidosGanados;
    private int partidosEmpatados;
    private int partidosPerdidos;
    private int puntos;

    /**
     * Constructor de la clase EstadisticaEquipo.
     * Inicializa todos los valores en cero.
     */
    public EstadisticaEquipo() {
        this.partidosJugados = 0;
        this.partidosGanados = 0;
        this.partidosEmpatados = 0;
        this.partidosPerdidos = 0;
        this.puntos = 0;
    }

    // Getters
    public int getPartidosJugados() {
        return partidosJugados;
    }

    public int getPartidosGanados() {
        return partidosGanados;
    }

    public int getPartidosEmpatados() {
        return partidosEmpatados;
    }

    public int getPartidosPerdidos() {
        return partidosPerdidos;
    }

    public int getPuntos() {
        return puntos;
    }

    /**
     * Actualiza las estadísticas del equipo después de un partido.
     * 3 puntos por victoria, 1 por empate, 0 por derrota.
     * 
     * @param golesAFavor goles marcados por el equipo
     * @param golesEnContra goles recibidos por el equipo
     */
    public void actualizarEstadisticas(int golesAFavor, int golesEnContra) {
        this.partidosJugados++;

        if (golesAFavor > golesEnContra) {
            // Victoria
            this.partidosGanados++;
            this.puntos += 3;
        } else if (golesAFavor == golesEnContra) {
            // Empate
            this.partidosEmpatados++;
            this.puntos += 1;
        } else {
            // Derrota
            this.partidosPerdidos++;
        }
    }

    /**
     * Retorna una representación en String de las estadísticas.
     */
    @Override
    public String toString() {
        return String.format("PJ: %d | PG: %d | PE: %d | PP: %d | Pts: %d",
                partidosJugados, partidosGanados, partidosEmpatados, 
                partidosPerdidos, puntos);
    }
}
