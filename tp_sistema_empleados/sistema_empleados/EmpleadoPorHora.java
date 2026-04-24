package sistema_empleados;

public class EmpleadoPorHora extends Empleado {
    private int horasTrabajadas;
    private double pagoPorHora;

    public EmpleadoPorHora(String nombre, double salarioBase, int horasTrabajadas, double pagoPorHora) {
        super(nombre, salarioBase);
        this.horasTrabajadas = horasTrabajadas;
        this.pagoPorHora = pagoPorHora;
    }

    @Override
    public double calcularSalario() {
        return horasTrabajadas * pagoPorHora;
    }
}