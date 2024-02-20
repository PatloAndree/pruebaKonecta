<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT,DELETE,  OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");



require_once "../models/usuarioModel.php"; 
require_once "../conexion.php";

// $usuarioModel = new UsuarioModel($conexion);
// $usuarios = $usuarioModel->listarUsuarios();

// $conexion->close();

// echo json_encode($usuarios);


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Llamar a la función para listar empleados
    $usuarioModel = new UsuarioModel($conexion);
    $empleados = $usuarioModel->listarUsuarios();

    echo json_encode($empleados);

} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // // Verificar si se recibieron datos por POST
    // if (isset($_POST['nombres']) ) {
    //     $nombre = $_POST['nombres'];
    //     $apellidos = $_POST['apellidos'];
    //     $dni = $_POST['dni'];
    //     $telefono = $_POST['telefono'];

    //     $usuarioModel = new UsuarioModel($conexion);

    //     // Llamar a la función para agregar un empleado
    //     if ($usuarioModel->agregarUsuario($nombre, $apellidos, $dni, $telefono)) {
    //         echo json_encode(array("mensaje" => "Empleado agregado correctamente"));
    //     } else {
    //         echo json_encode(array("mensaje" => "Error al agregar empleado"));
    //     }
    // } else {
    //     echo json_encode(array("mensaje" => "No se recibieron datos válidos"));
    // }
      // Verificar si se recibieron datos por POST
      $data = json_decode(file_get_contents("php://input"), true);

      if (isset($data['nombres']) && isset($data['apellidos']) && isset($data['dni']) && isset($data['telefono'])) {
          $nombre = $data['nombres'];
          $apellidos = $data['apellidos'];
          $dni = $data['dni'];
          $telefono = $data['telefono'];
  
          $usuarioModel = new UsuarioModel($conexion);
  
          // Llamar a la función para agregar un usuario
          if ($usuarioModel->agregarUsuario($nombre, $apellidos, $dni, $telefono)) {
              echo json_encode(array("mensaje" => "Usuario agregado correctamente"));
          } else {
              echo json_encode(array("mensaje" => "Error al agregar usuario"));
          }
      } else {
          echo json_encode(array("mensaje" => "No se recibieron datos válidos"));
      }
}

elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // parse_str(file_get_contents("php://input"), $data);

    $data = json_decode(file_get_contents("php://input"), true);


    // $id = $_GET['id'] ?? null;
    if (isset($data['nombres']) && isset($data['apellidos']) && isset($data['dni']) && isset($data['telefono'])) {
        $nombre = $data['nombres'];
        $apellidos = $data['apellidos'];
        $dni = $data['dni'];
        $telefono = $data['telefono'];
        $id = $data['id'];
        

        $usuarioModel = new UsuarioModel($conexion);

        // Llamar a la función para editar un usuario
        if ($usuarioModel->editarUsuario($id, $nombre, $apellidos, $dni, $telefono)) {
            echo json_encode(array("mensaje" => "Usuario editado correctamente"));
        } else {
            echo json_encode(array("mensaje" => "Error al editar usuario"));
        }
    } else {
        echo json_encode(array("mensaje" => "Datos incorrectos o incompletos"));
    }
}

else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Verificar si se recibió un ID de usuario válido
    $data = json_decode(file_get_contents("php://input"), true);


    parse_str($_SERVER['QUERY_STRING'], $params);

    $id = $params['id'] ?? null;

    if ($id !== null) {
        $usuarioModel = new UsuarioModel($conexion);
        
        // Llamar al método para eliminar un usuario
        if ($usuarioModel->eliminarUsuario($id)) {
            echo json_encode(array("mensaje" => "Usuario eliminado correctamente"));
        } else {
            echo json_encode(array("mensaje" => "Error al eliminar usuario 32"  ));
        }
    } else {
        echo json_encode(array("mensaje" => "ID de usuario no proporcionado"));
    }
} else {
    echo json_encode(array("mensaje" => "Método no permitido"));
}

$conexion->close();
?>




