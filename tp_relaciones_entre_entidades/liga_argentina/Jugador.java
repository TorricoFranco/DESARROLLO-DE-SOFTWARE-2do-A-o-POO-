package tp_der_liga_argentina.liga_argentina;

/**
 * Clase que representa a un jugador de fútbol.
 * Atributos: nombre, posición y goles marcados.
 */
public class Jugador {
    private String nombre;
    private String posicion;
    private int goles;

    /**
     * Constructor de la clase Jugador.
     * 
     * @param nombre el nombre del jugador
     * @param posicion la posición del jugador
     */
    public Jugador(String nombre, String posicion) {
        this.nombre = nombre;
        this.posicion = posicion;
        this.goles = 0;
    }

    // Getters
    public String getNombre() {
        return nombre;
    }

    public String getPosicion() {
        return posicion;
    }

    public int getGoles() {
        return goles;
    }

    // Setters
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setPosicion(String posicion) {
        this.posicion = posicion;
    }

    /**
     * Incrementa los goles del jugador.
     * 
     * @param golesAñadidos cantidad de goles a añadir
     */
    public void agregarGoles(int golesAñadidos) {
        if (golesAñadidos >= 0) {
            this.goles += golesAñadidos;
        }
    }

    @Override
    public String toString() {
        return String.format("%-20s | %-15s | Goles: %d", nombre, posicion, goles);
    }
}
