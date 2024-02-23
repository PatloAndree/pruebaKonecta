<?php
namespace App\Controllers;
use App\Models\UsuariosModel;
// defined('BASEPATH') OR exit('No direct script access allowed');

class UsuariosController extends BaseController
{
    protected $modelo;

    public function __construct()
    {
        // parent::__construct();
        $this->modelo = new UsuariosModel();
    }

    public function index()
    {
        // return view('Inicio');
        echo 'Bienvenidos';
    }

    public function login()
    {
        $request = json_decode(file_get_contents('php://input'));

        $username = $request->email;
        $password = $request->password;

        // Validar el inicio de sesión
        $usuario =  $this->modelo->validarLogin($username, $password);

        if ($usuario) {
            // Inicio de sesión exitoso
            // Aquí puedes establecer la sesión, redirigir al usuario, etc.
            echo json_encode(['status' => 1, 'data' => $usuario ,'message' => 'Usuario encontrado correctamente']);
            
        } else {
            // Credenciales incorrectas
            // Puedes mostrar un mensaje de error en la vista de inicio de sesión
            echo json_encode(['status' => 0, 'message' => 'Usuario no encontrado correctamente']);
            
        }
    }


    public function getUsuarios()
    {
        $request = json_decode(file_get_contents('php://input'));
        $datos = $this->modelo->obtenerUsuarios();
        if ($datos == '0') {
            $datos = ['error' => '1', 'msn' => '¡Intentalo de nuevo!'];
        } else {
            echo json_encode($datos);
        }
    }

    public function agregarUsuario()
    {
        $request = json_decode(file_get_contents('php://input'));
        $dataInsert['nombres'] = $request->nombres;
        $dataInsert['apellidos'] = $request->apellidos;
        $dataInsert['dni'] = $request->dni;
        $dataInsert['telefono'] = $request->telefono;
        $sw_insert = $this->modelo->agregarUsuario($dataInsert);
        if ($sw_insert > 0) {
            echo 1;
        } else {
            echo 0;
        }
    }

    public function editarUsuario()
    {
        $request = json_decode(file_get_contents('php://input'));
        $usuario_id = $request->id;
        $nombres = $request->nombres;
        $apellidos = $request->apellidos;
        $dni = $request->dni;
        $telefono = $request->telefono;
        $dataUpdate['nombres'] = $nombres;
        $dataUpdate['apellidos'] = $apellidos;
        $dataUpdate['dni'] = $dni;
        $dataUpdate['telefono'] = $telefono;
        $sw_update = $this->modelo->editarUsuario($usuario_id, $dataUpdate);

        // Enviar respuesta al cliente según el resultado de la actualización
        if ($sw_update === '1') {
            echo json_encode(['success' => true, 'message' => 'Usuario actualizado correctamente']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al actualizar usuario']);
        }
    }

    public function eliminarUsuario()
    {
        $request = json_decode(file_get_contents('php://input'));
        // $usuario_id = $request->id;
        $usuario_id = $this->request->getGet('id');
        $sw_update = $this->modelo->eliminarUsuario($usuario_id);
        if ($sw_update === '1') {
            echo json_encode(['success' => true, 'message' => 'Usuario eliminado correctamente']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al eliminar usuario']);
        }
    }
}
