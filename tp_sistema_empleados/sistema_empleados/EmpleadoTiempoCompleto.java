package sistema_empleados;

public class EmpleadoTiempoCompleto extends Empleado {

    public EmpleadoTiempoCompleto(String nombre, double salarioBase) {
        super(nombre, salarioBase);
    }

    @Override
    public double calcularSalario() {
        return salarioBase;
    }
}