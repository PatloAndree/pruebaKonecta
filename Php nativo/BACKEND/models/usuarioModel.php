<?php
class usuarioModel {
    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function listarUsuarios() {
        // Consulta SQL para obtener todos los usuarios
        $sql = "SELECT * FROM usuarios";

        // Ejecutar la consulta
        $result = $this->conexion->query($sql);

        // Verificar si la consulta fue exitosa
        if ($result === false) {
            die("Error al ejecutar la consulta: " . $this->conexion->error);
        }
        // Almacenar los resultados en un array
        $usuarios = [];
        while ($fila = $result->fetch_assoc()) {
            $usuarios[] = $fila;
        }

        // Devolver el array de usuarios
        return $usuarios;
    }
}
?>





