<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AdminTaskController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;


// 🔹 Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// 🔹 Authenticated user routes
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user/profile', [UserController::class, 'profile']);

    Route::get('/tasks', [TaskController::class, 'index']);
    Route::post('/tasks', [TaskController::class, 'store']);
    Route::put('/tasks/{task}', [TaskController::class, 'update']);
    Route::patch('/tasks/{task}/toggle', [TaskController::class, 'toggleComplete']);
    Route::delete('/tasks/{task}', [TaskController::class, 'destroy']);

    Route::post('/logout', [AuthController::class, 'logout']);
});

// // 🔹 Admin routes
// Route::middleware(['auth:sanctum', 'admin'])->group(function () {
//     Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
//     Route::get('/admin/users', [AdminController::class, 'users']);
//     Route::post('/admin/user/status/{id}', [AdminController::class, 'toggleUserStatus']);
//     Route::post('/admin/user/role/{id}', [AdminController::class, 'updateRole']);
//     Route::get('/admin/tasks', [AdminController::class, 'tasks']);
//     Route::get('/admin/tasks/user/{userId}', [AdminController::class, 'userTasks']);// New route for daily stats
//     Route::get('/admin/stats', [AdminController::class, 'dailyStats']);
// });

// 🔹 Admin routes
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
    Route::get('/admin/users', [AdminController::class, 'users']);
    Route::post('/admin/user/status/{id}', [AdminController::class, 'toggleUserStatus']);
    Route::post('/admin/user/role/{id}', [AdminController::class, 'updateRole']);
    Route::get('/admin/tasks', [AdminController::class, 'tasks']);
    Route::get('/admin/tasks/user/{userId}', [AdminController::class, 'userTasks']);
    
    // New admin task management routes
    Route::post('/admin/tasks/user/{userId}/create', [AdminTaskController::class, 'storeForUser']);
    Route::patch('/admin/tasks/{taskId}/toggle', [AdminTaskController::class, 'toggleComplete']);
    Route::delete('/admin/tasks/{taskId}', [AdminTaskController::class, 'destroy']);
    
    Route::get('/admin/stats', [AdminController::class, 'dailyStats']);
});