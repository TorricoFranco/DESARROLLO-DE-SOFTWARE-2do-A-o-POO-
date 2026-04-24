package tp_der_liga_argentina.liga_argentina;

import java.util.ArrayList;

/**
 * Clase que representa un equipo de fútbol.
 * Mantiene:
 * - Composición: un objeto EstadisticaEquipo (existe solo si existe el Equipo)
 * - Agregación: una lista de Jugadores (pueden existir sin el Equipo)
 */
public class Equipo {
    private String nombre;
    private ArrayList<Jugador> jugadores;
    private EstadisticaEquipo estadisticas;

    /**
     * Constructor de la clase Equipo.
     * 
     * @param nombre el nombre del equipo
     */
    public Equipo(String nombre) {
        this.nombre = nombre;
        this.jugadores = new ArrayList<>();
        this.estadisticas = new EstadisticaEquipo(); // composición
    }

    // Getters
    public String getNombre() {
        return nombre;
    }

    public ArrayList<Jugador> getJugadores() {
        return jugadores;
    }

    public EstadisticaEquipo getEstadisticas() {
        return estadisticas;
    }

    // Setters
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     * Agrega un jugador al equipo.
     * 
     * @param jugador el jugador a agregar
     */
    public void agregarJugador(Jugador jugador) {
        if (jugador != null && !jugadores.contains(jugador)) {
            jugadores.add(jugador);
            System.out.println("✓ Jugador " + jugador.getNombre() + 
                             " agregado a " + this.nombre);
        }
    }

    /**
     * Elimina un jugador del equipo.
     * 
     * @param jugador el jugador a eliminar
     */
    public void eliminarJugador(Jugador jugador) {
        if (jugadores.contains(jugador)) {
            jugadores.remove(jugador);
            System.out.println("✓ Jugador " + jugador.getNombre() + 
                             " eliminado de " + this.nombre);
        }
    }

    /**
     * Retorna la cantidad de jugadores del equipo.
     */
    public int cantidadJugadores() {
        return jugadores.size();
    }

    /**
     * Muestra el plantel del equipo.
     */
    public void mostrarPlantel() {
        System.out.println("\n--- Plantel de " + nombre + " ---");
        if (jugadores.isEmpty()) {
            System.out.println("El equipo no tiene jugadores.");
        } else {
            for (Jugador j : jugadores) {
                System.out.println(j);
            }
        }
    }

    /**
     * Retorna una representación en String del equipo.
     */
    @Override
    public String toString() {
        return String.format("%-20s | %s | Jugadores: %d", 
                nombre, estadisticas.toString(), jugadores.size());
    }
}
