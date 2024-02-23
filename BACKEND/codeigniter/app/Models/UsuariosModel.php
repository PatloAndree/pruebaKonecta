<?php

namespace App\Models;

use CodeIgniter\Model;


class UsuariosModel extends Model {

    protected $table = 'usuarios'; // Nombre de la tabla en la base de datos
    protected $primaryKey = 'id'; // Clave primaria de la tabla
    protected $allowedFields = ['id', 'nombres', 'apellidos', 'dni', 'telefono','status'];

    function obtenerUsuarios(){
       return $this->where('status', '1')->findAll(); // Consulta utilizando Query Builder
	}
    
    function agregarUsuario($dataInsert){
        if ($this->insert($dataInsert)) {
            return '1'; // Éxito en la inserción
        } else {
            return '0'; // Falló la inserción
        }
	}

    public function validarLogin($username, $password)
    {
        // Buscar el usuario en la base de datos
        $usuario = $this->where('nombres', $username)->first();
        // print_r( $usuario);
        if ($usuario) {
            // Verificar la contraseña
            if ($password == $usuario['dni'] &&  $username ==  $usuario['nombres']) {
                return $usuario;
            }
        }

        return false;
    }



	function editarUsuario($usuario_id,$dataUpdate){
       
        $this->where('id', $usuario_id)->set($dataUpdate)->update();
        // Verifica si se realizaron cambios
        if ($this->db->affectedRows() > 0) {
            return '1'; // Éxito en la actualización
        } else {
            return '0'; // Falló la actualización
        }

	}

    function eliminarUsuario($usuario_id){
       
        $this->where('id', $usuario_id)->set('status',0)->update();
        // Verifica si se realizaron cambios
        if ($this->db->affectedRows() > 0) {
            return '1'; // Éxito en la actualización
        } else {
            return '0'; // Falló la actualización
        }

	}


}