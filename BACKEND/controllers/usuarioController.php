<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");



require_once "../models/usuarioModel.php"; 
require_once "../conexion.php";

$usuarioModel = new UsuarioModel($conexion);
$usuarios = $usuarioModel->listarUsuarios();

$conexion->close();

echo json_encode($usuarios);


?>



