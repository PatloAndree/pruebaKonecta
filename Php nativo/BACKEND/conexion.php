<?php
$servername = "localhost"; // Nombre del servidor
$username = "root"; // Nombre de usuario de la base de datos
$password = ""; // Contraseña de la base de datos
$dbname = "konecta"; // Nombre de la base de datos a la que te quieres conectar

// Crear la conexión
$conexion = new mysqli($servername, $username, $password, $dbname);

// Comprobar la conexión
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

?>
