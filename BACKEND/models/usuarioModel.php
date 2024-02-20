<?php
class usuarioModel {
    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function listarUsuarios2() {
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

    public function agregarUsuario2($nombre, $apellidos) {
        // Preparar la consulta SQL para insertar un nuevo usuario
        $sql = "INSERT INTO usuarios (nombre, apellidos) VALUES (?, ?)";
        $stmt = $this->conexion->prepare($sql);
        $stmt->bind_param("ss", $nombre, $email);

        // Ejecutar la consulta
        if ($stmt->execute()) {
            return true; // El usuario se agregó exitosamente
        } else {
            return false; // Hubo un error al agregar el usuario
        }
    }


    public function listarUsuarios() {
        // Realizar la consulta SQL para obtener todos los empleados
        $sql = "SELECT * FROM usuarios where status = 1";
        $result = $this->conexion->query($sql);

        // Verificar si se encontraron empleados
        if ($result->num_rows > 0) {
            // Almacenar los empleados en un array
            $empleados = array();
            while ($row = $result->fetch_assoc()) {
                $empleados[] = $row;
            }
            return $empleados;
        } else {
            return array(); // Devolver un array vacío si no se encontraron empleados
        }
    }

    // Método para agregar un nuevo empleado
    public function agregarUsuario($nombre, $apellidos,$dni,$telefono) {
        // Preparar la consulta SQL para insertar un nuevo empleado
        $sql = "INSERT INTO usuarios (nombres, apellidos,dni,telefono) VALUES (?, ?,?,?)";
        $stmt = $this->conexion->prepare($sql);
        $stmt->bind_param("ssii", $nombre, $apellidos,$dni,$telefono);

        // Ejecutar la consulta
        if ($stmt->execute()) {
            return true; // El empleado se agregó exitosamente
        } else {
            return false; // Hubo un error al agregar el empleado
        }
    }

    public function editarUsuario($id, $nombre, $apellidos, $dni, $telefono) {
        // Preparar la consulta SQL para actualizar el usuario
        $sql = "UPDATE usuarios SET nombres=?, apellidos=?, dni=?, telefono=? WHERE id=?";
        $stmt = $this->conexion->prepare($sql);
        $stmt->bind_param("ssiii", $nombre, $apellidos, $dni, $telefono, $id);

        // Ejecutar la consulta
        if ($stmt->execute()) {
            return true; // El usuario se actualizó correctamente
        } else {
            return false; // Hubo un error al actualizar el usuario
        }
    }

    public function eliminarUsuario($id) {
        // Preparar la consulta SQL para actualizar el estado del usuario a 0
        $sql = "UPDATE usuarios SET status = 0 WHERE id = ?";
        $stmt = $this->conexion->prepare($sql);
        $stmt->bind_param("i", $id);

        // Ejecutar la consulta
        if ($stmt->execute()) {
            return true; // El usuario se eliminó correctamente
        } else {
            return false; // Hubo un error al eliminar el usuario
        }
    }

}
?>





