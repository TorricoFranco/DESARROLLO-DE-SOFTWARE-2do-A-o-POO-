package app;
import java.util.ArrayList;
import sistema_empleados.*;

public class Main {
    public static void main(String[] args) {

        ArrayList<Empleado> empleados = new ArrayList<>();

        empleados.add(new EmpleadoTiempoCompleto("Juan", 1000));
        empleados.add(new EmpleadoPorHora("Ana", 0, 40, 10));
        empleados.add(new EmpleadoComision("Luis", 500, 2000, 0.1));

        for (Empleado e : empleados) {
            e.mostrarInfo();
            System.out.println("Salario: " + e.calcularSalario());
            System.out.println("------");
        }
    }
}
