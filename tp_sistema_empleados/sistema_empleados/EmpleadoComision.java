package sistema_empleados;

public class EmpleadoComision extends Empleado {
    private double ventas;
    private double porcentaje;

    public EmpleadoComision(String nombre, double salarioBase, double ventas, double porcentaje) {
        super(nombre, salarioBase);
        this.ventas = ventas;
        this.porcentaje = porcentaje;
    }

    @Override
    public double calcularSalario() {
        return salarioBase + (ventas * porcentaje);
    }
}
