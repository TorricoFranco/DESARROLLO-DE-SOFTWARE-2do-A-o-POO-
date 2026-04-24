package sistema_empleados;

public class EmpleadoFreelance extends Empleado {
    private int proyectos;
    private double pagoPorProyecto;

    public EmpleadoFreelance(String nombre, double salarioBase, int proyectos, double pagoPorProyecto) {
        super(nombre, salarioBase);
        this.proyectos = proyectos;
        this.pagoPorProyecto = pagoPorProyecto;
    }

    @Override
    public double calcularSalario() {
        return proyectos * pagoPorProyecto;
    }
}