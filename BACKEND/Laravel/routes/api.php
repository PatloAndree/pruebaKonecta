<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\UsersController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/usersGeneral',[ApiController::class,'usersGeneral']);
Route::get('/usersInactivos',[ApiController::class,'usersInactive']);

Route::post('/login',[ApiController::class,'login']);

Route::get('/usuarios/listar', [UsersController::class, 'usersGeneral'])->name('users.usersGeneral');
Route::post('/usuarios/agregarUsuario', [UsersController::class, 'agregarUsuario'])->name('users.agregarUsuario');
Route::put('/usuarios/editarUsuario', [UsersController::class, 'editarUsuario'])->name('users.editarUsuario');
Route::delete('/usuarios/eliminarUsuario/{id?}', [UsersController::class, 'eliminarUsuario'])->name('users.eliminarUsuario');   



