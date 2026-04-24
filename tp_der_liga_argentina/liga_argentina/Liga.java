package tp_der_liga_argentina.liga_argentina;

import java.util.ArrayList;
import java.util.Comparator;

/**
 * Clase que representa la Liga Argentina de Fútbol.
 * Atributos: nombre de la liga y un ArrayList de Equipos.
 * Métodos: agregar equipo y mostrar tabla de posiciones ordenada por puntos.
 */
public class Liga {
    private String nombre;
    private ArrayList<Equipo> equipos;

    /**
     * Constructor de la clase Liga.
     * 
     * @param nombre el nombre de la liga
     */
    public Liga(String nombre) {
        this.nombre = nombre;
        this.equipos = new ArrayList<>();
    }

    // Getters
    public String getNombre() {
        return nombre;
    }

    public ArrayList<Equipo> getEquipos() {
        return equipos;
    }

    // Setters
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     * Agrega un equipo a la liga.
     * Valida que no exista un equipo con el mismo nombre.
     * 
     * @param equipo el equipo a agregar
     */
    public void agregarEquipo(Equipo equipo) {
        if (equipo == null) {
            System.out.println("⚠ El equipo no puede ser nulo.");
            return;
        }

        for (Equipo e : equipos) {
            if (e.getNombre().equalsIgnoreCase(equipo.getNombre())) {
                System.out.println("⚠ Ya existe un equipo con el nombre: " + equipo.getNombre());
                return;
            }
        }

        equipos.add(equipo);
        System.out.println("✓ Equipo " + equipo.getNombre() + " agregado a la " + nombre);
    }

    /**
     * Retorna la cantidad de equipos en la liga.
     */
    public int cantidadEquipos() {
        return equipos.size();
    }

    /**
     * Muestra la tabla de posiciones ordenada por puntos (descendente).
     * En caso de empate en puntos, ordena por diferencia de goles.
     */
    public void mostrarTabla() {
        if (equipos.isEmpty()) {
            System.out.println("La liga no tiene equipos aún.");
            return;
        }

        // Crear una copia y ordenar
        ArrayList<Equipo> equiposOrdenados = new ArrayList<>(equipos);
        equiposOrdenados.sort(new Comparator<Equipo>() {
            @Override
            public int compare(Equipo e1, Equipo e2) {
                // Ordenar por puntos (descendente)
                int comparePuntos = Integer.compare(
                        e2.getEstadisticas().getPuntos(),
                        e1.getEstadisticas().getPuntos()
                );
                return comparePuntos;
            }
        });

        // Mostrar tabla
        System.out.println("\n╔════════════════════════════════════════════════════════════════════════════════════════════╗");
        System.out.printf("║ %-90s ║\n", "TABLA DE POSICIONES - " + nombre);
        System.out.println("╠════════════════════════════════════════════════════════════════════════════════════════════╣");

        System.out.printf("║ %-3s │ %-30s │ %-5s │ %-5s │ %-5s │ %-5s │ %-7s │ %-5s ║\n",
                "POS", "EQUIPO", "PJ", "PG", "PE", "PP", "PUNTOS", "JUG");

        System.out.println("╠════════════════════════════════════════════════════════════════════════════════════════════╣");

        int posicion = 1;
        for (Equipo e : equiposOrdenados) {
            System.out.printf("║ %-3d │ %-30s │ %-5d │ %-5d │ %-5d │ %-5d │ %-7d │ %-5d ║\n",
                    posicion,
                    e.getNombre(),
                    e.getEstadisticas().getPartidosJugados(),
                    e.getEstadisticas().getPartidosGanados(),
                    e.getEstadisticas().getPartidosEmpatados(),
                    e.getEstadisticas().getPartidosPerdidos(),
                    e.getEstadisticas().getPuntos(),
                    e.cantidadJugadores()
            );
            posicion++;
        }

        System.out.println("╚════════════════════════════════════════════════════════════════════════════════════════════╝");
    }

    /**
     * Retorna una representación en String de la liga.
     */
    @Override
    public String toString() {
        return String.format("Liga: %s | Equipos: %d", nombre, equipos.size());
    }
}
