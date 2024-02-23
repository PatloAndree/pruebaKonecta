<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Validator;



class UsersController extends Controller
{

    public function index(){
        $data['title']='Usuarios';
        return view('login',$data);
    }

    
    public function usersGeneral(Request $request){

        // if($request->has('active')){
        //     $users = User::where('active',true)->get();
        // }else{
        //     $users = User::all();
        // }
        $users = User::where('status',1)->get();


        return response()->json($users);
    }

    public function agregarUsuario(Request $request)
    {

        $sw_insert =  User::create([
			'name'=>$request->nombres,
			'email'=>$request->apellidos,
		]);

        if ($sw_insert) {
            // Inserción exitosa
            echo json_encode(array("sw_error" => 0, "titulo" => "Éxito", "type" => "success", "message" => "Se registró correctamente la categoría"));
        } else {
            // Hubo un error en la inserción
            echo json_encode(array("sw_error" => 1, "titulo" => "Error", "type" => "error", "message" => "Error al registrar la categoría"));
        }

    }

    public function editarUsuario(Request $request){
       
        // Verifica si se realizaron cambios

        $dataUpdate = array();
        $dataUpdate['name'] = $request->nombres;
        $dataUpdate['email'] = $request->apellidos;
		$sw_update = User::where('id', $request->id)->update($dataUpdate);
        if ($sw_update) {
            // Inserción exitosa
            echo json_encode(array("sw_error" => 0, "titulo" => "Éxito", "type" => "success", "message" => "Se edito correctamente la categoría"));
        } else {
            // Hubo un error en la inserción
            echo json_encode(array("sw_error" => 1, "titulo" => "Error", "type" => "error", "message" => "Error al editar la categoría"));
        }
	}

    
    public function eliminarUsuario($idUsuario){
       
        // Verifica si se realizaron cambios
        $Usuario = User::where('id',$idUsuario)->update(['status'=>0]);

  
        if ($Usuario) {
            // Inserción exitosa
            echo json_encode(array("sw_error" => 0, "titulo" => "Éxito", "type" => "success", "message" => "Se eliminó correctamente el usuario"));
        } else {
            // Hubo un error en la inserción
            echo json_encode(array("sw_error" => 1, "titulo" => "Error", "type" => "error", "message" => "Error al eliminar el usuario"));
        }
	}

}