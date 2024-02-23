<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

$routes->get('/getUsuarios', 'UsuariosController::getUsuarios');
$routes->post('/agregarUsuario', 'UsuariosController::agregarUsuario');
$routes->post('/validarLogin', 'UsuariosController::login');
$routes->put('/editarUsuario', 'UsuariosController::editarUsuario');
$routes->delete('/eliminarUsuario', 'UsuariosController::eliminarUsuario');




