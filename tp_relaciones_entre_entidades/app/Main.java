package tp_der_liga_argentina.app;

import tp_der_liga_argentina.liga_argentina.*;
import java.util.Scanner;

/**
 * Clase Main: Ejecuta la aplicación de gestión de la Liga Argentina de Fútbol.
 * Crea equipos, jugadores, partidos y muestra la tabla de posiciones.
 */
public class Main {
    private static Scanner scanner = new Scanner(System.in);
    private static Liga liga;

    public static void main(String[] args) {
        System.out.println("╔═══════════════════════════════════════════════════════════╗");
        System.out.println("║   SISTEMA DE GESTIÓN - LIGA ARGENTINA DE FÚTBOL 2026   ║");
        System.out.println("╚═══════════════════════════════════════════════════════════╝\n");

        // Inicializar la liga
        liga = new Liga("Liga Argentina de Fútbol - Torneo 2026");

        inicializarDatos();

        mostrarMenu();
    }

    /**
     * Inicializa la aplicación con datos de ejemplo.
     */
    private static void inicializarDatos() {
        System.out.println("📋 Inicializando datos de ejemplo...\n");

        // Crear equipos
        Equipo boca = new Equipo("Boca Juniors");
        Equipo river = new Equipo("River Plate");
        Equipo independiente = new Equipo("Independiente");
        Equipo gimnasia = new Equipo("Gimnasia y Esgrima La Plata");

        // Agregar jugadores a Boca
        boca.agregarJugador(new Jugador("Edwin Cardona", "Mediocampista"));
        boca.agregarJugador(new Jugador("Sebastián Villa", "Delantero"));
        boca.agregarJugador(new Jugador("Carlos Izquierdoz", "Defensa"));
        boca.agregarJugador(new Jugador("Agustín Rossi", "Portero"));

        // Agregar jugadores a River
        river.agregarJugador(new Jugador("Nicolás De La Cruz", "Mediocampista"));
        river.agregarJugador(new Jugador("Miguel Borja", "Delantero"));
        river.agregarJugador(new Jugador("Paulo Díaz", "Defensa"));
        river.agregarJugador(new Jugador("Franco Armani", "Portero"));

        // Agregar jugadores a Independiente
        independiente.agregarJugador(new Jugador("Leandro Benegas", "Delantero"));
        independiente.agregarJugador(new Jugador("Sergio Barreto", "Defensa"));
        independiente.agregarJugador(new Jugador("Rodrigo Rey", "Portero"));

        // Agregar jugadores a Gimnasia
        gimnasia.agregarJugador(new Jugador("Nacho Fernandez", "Mediocampista"));
        gimnasia.agregarJugador(new Jugador("Lionel Messi", "Delantero"));
        gimnasia.agregarJugador(new Jugador("Nelson Insfrán", "Arquero"));    

        // Agregar equipos a la liga
        liga.agregarEquipo(boca);
        liga.agregarEquipo(river);
        liga.agregarEquipo(independiente);
        liga.agregarEquipo(gimnasia);

        // Jugar algunos partidos de ejemplo
        System.out.println("\n⚽ Jugando partidos de ejemplo...");
        
        try {
            Partido partido1 = new Partido(boca, river);
            partido1.jugar(2, 1);

            Partido partido2 = new Partido(independiente, boca);
            partido2.jugar(1, 1);

            Partido partido3 = new Partido(river, independiente);
            partido3.jugar(3, 0);

            Partido partido4 = new Partido(gimnasia, boca);
            partido4.jugar(6, 2);

             Partido partido5 = new Partido(independiente, gimnasia);
            partido5.jugar(0, 3);
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }

        System.out.println("\n✓ Datos inicializados correctamente.\n");
    }

    /**
     * Muestra el menú principal de la aplicación.
     */
    private static void mostrarMenu() {
        boolean continuar = true;

        while (continuar) {
            System.out.println("\n╔════════════════════════════════════════╗");
            System.out.println("║            MENÚ PRINCIPAL              ║");
            System.out.println("╠════════════════════════════════════════╣");
            System.out.println("║ 1. Ver tabla de posiciones             ║");
            System.out.println("║ 2. Ver plantel de un equipo            ║");
            System.out.println("║ 3. Jugar un partido                    ║");
            System.out.println("║ 4. Agregar equipo                      ║");
            System.out.println("║ 5. Agregar jugador a un equipo         ║");
            System.out.println("║ 6. Ver información de un equipo        ║");
            System.out.println("║ 7. Salir                               ║");
            System.out.println("╚════════════════════════════════════════╝");
            System.out.print("Selecciona una opción (1-7): ");

            try {
                int opcion = scanner.nextInt();
                scanner.nextLine(); // Limpiar buffer

                switch (opcion) {
                    case 1:
                        liga.mostrarTabla();
                        break;
                    case 2:
                        verPlantel();
                        break;
                    case 3:
                        jugarPartido();
                        break;
                    case 4:
                        agregarEquipo();
                        break;
                    case 5:
                        agregarJugador();
                        break;
                    case 6:
                        verInformacionEquipo();
                        break;
                    case 7:
                        continuar = false;
                        System.out.println("\n¡Gracias por usar el Sistema de Gestión! Hasta luego");
                        break;
                    default:
                        System.out.println("⚠ Opción no válida. Por favor, selecciona una opción entre 1 y 7.");
                }
            } catch (java.util.InputMismatchException e) {
                System.out.println("⚠ Error: Debes ingresar un número.");
                scanner.nextLine();
            }
        }
        scanner.close();
    }

    /**
     * Ver el plantel de un equipo.
     */
    private static void verPlantel() {
        System.out.println("\n--- VER PLANTEL ---");
        Equipo equipo = seleccionarEquipo();
        if (equipo != null) {
            equipo.mostrarPlantel();
        }
    }

    /**
     * Jugar un partido.
     */
    private static void jugarPartido() {
        System.out.println("\n--- JUGAR PARTIDO ---");

        if (liga.cantidadEquipos() < 2) {
            System.out.println("⚠ Se necesitan al menos 2 equipos para jugar un partido.");
            return;
        }

        System.out.print("Selecciona el equipo local: ");
        Equipo local = seleccionarEquipo();
        if (local == null) return;

        System.out.print("Selecciona el equipo visitante: ");
        Equipo visitante = seleccionarEquipo();
        if (visitante == null) return;

        try {
            Partido partido = new Partido(local, visitante);

            System.out.print("Goles del equipo local: ");
            int golesLocal = scanner.nextInt();
            System.out.print("Goles del equipo visitante: ");
            int golesVisitante = scanner.nextInt();
            scanner.nextLine();

            partido.jugar(golesLocal, golesVisitante);
        } catch (IllegalArgumentException e) {
            System.out.println("⚠ Error: " + e.getMessage());
            scanner.nextLine();
        }
    }

    /**
     * Agregar un nuevo equipo.
     */
    private static void agregarEquipo() {
        System.out.println("\n--- AGREGAR EQUIPO ---");
        System.out.print("Ingresa el nombre del equipo: ");
        String nombre = scanner.nextLine().trim();

        if (nombre.isEmpty()) {
            System.out.println("⚠ El nombre del equipo no puede estar vacío.");
            return;
        }

        Equipo nuevoEquipo = new Equipo(nombre);
        liga.agregarEquipo(nuevoEquipo);
    }

    /**
     * Agregar un jugador a un equipo.
     */
    private static void agregarJugador() {
        System.out.println("\n--- AGREGAR JUGADOR ---");
        Equipo equipo = seleccionarEquipo();
        if (equipo == null) return;

        System.out.print("Nombre del jugador: ");
        String nombre = scanner.nextLine().trim();

        System.out.print("Posición del jugador: ");
        String posicion = scanner.nextLine().trim();

        if (nombre.isEmpty() || posicion.isEmpty()) {
            System.out.println("⚠ El nombre y la posición no pueden estar vacíos.");
            return;
        }

        Jugador nuevoJugador = new Jugador(nombre, posicion);
        equipo.agregarJugador(nuevoJugador);
    }

    /**
     * Ver información de un equipo.
     */
    private static void verInformacionEquipo() {
        System.out.println("\n--- INFORMACIÓN DEL EQUIPO ---");
        Equipo equipo = seleccionarEquipo();
        if (equipo != null) {
            System.out.println("\nEquipo: " + equipo.getNombre());
            System.out.println("Estadísticas: " + equipo.getEstadisticas());
            System.out.println("Cantidad de jugadores: " + equipo.cantidadJugadores());
            equipo.mostrarPlantel();
        }
    }

    /**
     * Selecciona un equipo del menú de la liga.
     * 
     * @return el equipo seleccionado o null si cancela
     */
    private static Equipo seleccionarEquipo() {
        if (liga.cantidadEquipos() == 0) {
            System.out.println("⚠ No hay equipos en la liga.");
            return null;
        }

        System.out.println("\nEquipos disponibles:");
        for (int i = 0; i < liga.getEquipos().size(); i++) {
            System.out.println((i + 1) + ". " + liga.getEquipos().get(i).getNombre());
        }
        System.out.println("0. Cancelar");

        System.out.print("Selecciona un equipo (1-" + liga.cantidadEquipos() + " o 0 para cancelar): ");
        try {
            int seleccion = scanner.nextInt();
            scanner.nextLine();

            if (seleccion == 0) {
                return null;
            }
            if (seleccion > 0 && seleccion <= liga.cantidadEquipos()) {
                return liga.getEquipos().get(seleccion - 1);
            }
        } catch (java.util.InputMismatchException e) {
            scanner.nextLine();
        }

        System.out.println("⚠ Selección no válida.");
        return null;
    }
}
