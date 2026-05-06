package tp_der_liga_argentina.liga_argentina;

/**
 * Clase que representa un partido de fútbol.
 * Atributos: equipoLocal, equipoVisitante, golesLocal, golesVisitante.
 * Mantiene una Asociación: ambos equipos están relacionados pero pueden existir sin el partido.
 */
public class Partido {
    private Equipo equipoLocal;
    private Equipo equipoVisitante;
    private int golesLocal;
    private int golesVisitante;
    private boolean yaJugado;

    /**
     * Constructor de la clase Partido.
     * Valida que los equipos sean diferentes.
     * 
     * @param equipoLocal el equipo que juega de local
     * @param equipoVisitante el equipo que juega de visitante
     */
    public Partido(Equipo equipoLocal, Equipo equipoVisitante) {
        if (equipoLocal == null || equipoVisitante == null) {
            throw new IllegalArgumentException("Los equipos no pueden ser nulos.");
        }
        if (equipoLocal.equals(equipoVisitante)) {
            throw new IllegalArgumentException(
                "No se puede jugar un partido entre el mismo equipo.");
        }
        this.equipoLocal = equipoLocal;
        this.equipoVisitante = equipoVisitante;
        this.golesLocal = 0;
        this.golesVisitante = 0;
        this.yaJugado = false;
    }

    // Getters
    public Equipo getEquipoLocal() {
        return equipoLocal;
    }

    public Equipo getEquipoVisitante() {
        return equipoVisitante;
    }

    public int getGolesLocal() {
        return golesLocal;
    }

    public int getGolesVisitante() {
        return golesVisitante;
    }

    public boolean isYaJugado() {
        return yaJugado;
    }

    /**
     * Juega el partido asignando los goles y actualizando las estadísticas.
     * 
     * @param golesLocal goles marcados por el equipo local
     * @param golesVisitante goles marcados por el equipo visitante
     */
    public void jugar(int golesLocal, int golesVisitante) {
        if (golesLocal < 0 || golesVisitante < 0) {
            throw new IllegalArgumentException("Los goles no pueden ser negativos.");
        }
        if (yaJugado) {
            System.out.println("⚠ Este partido ya ha sido jugado.");
            return;
        }

        this.golesLocal = golesLocal;
        this.golesVisitante = golesVisitante;
        this.yaJugado = true;

        // Actualizar estadísticas del equipo local
        equipoLocal.getEstadisticas().actualizarEstadisticas(golesLocal, golesVisitante);

        // Actualizar estadísticas del equipo visitante
        equipoVisitante.getEstadisticas().actualizarEstadisticas(golesVisitante, golesLocal);

        mostrarResultado();
    }

    /**
     * Muestra el resultado del partido en consola.
     */
    public void mostrarResultado() {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║          RESULTADO DEL PARTIDO         ║");
        System.out.println("╚════════════════════════════════════════╝");
        System.out.printf("%-20s %d - %d %-20s\n", 
                equipoLocal.getNombre(), golesLocal, golesVisitante, 
                equipoVisitante.getNombre());

        if (golesLocal > golesVisitante) {
            System.out.println(" Victoria: " + equipoLocal.getNombre());
        } else if (golesLocal < golesVisitante) {
            System.out.println("Victoria: " + equipoVisitante.getNombre());
        } else {
            System.out.println("⚖ Resultado: EMPATE");
        }
    }

    /**
     * Retorna una representación en String del partido.
     */
    @Override
    public String toString() {
        if (!yaJugado) {
            return String.format("%s vs %s (Pendiente)", 
                    equipoLocal.getNombre(), equipoVisitante.getNombre());
        }
        return String.format("%s %d - %d %s", 
                equipoLocal.getNombre(), golesLocal, golesVisitante, 
                equipoVisitante.getNombre());
    }
}
