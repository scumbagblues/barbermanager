<?php

use App\Http\Controllers\BarberShop\AppointmentController;
use App\Http\Controllers\BarberShop\BarberController;
use App\Http\Controllers\BarberShop\BarberShopController;
use App\Http\Controllers\BarberShop\ClientController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;





Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('barber-settings', [BarberShopController::class, 'index'])->name('barber-settings');
    Route::post('barber-settings', [BarberShopController::class, 'store'])->name('barber-settings');
    //Barbers Management 
    Route::get('barbers', [BarberController::class, 'index'])->name('barbers');
    Route::get('barbers/create', [BarberController::class, 'create'])->name('barbers.create');
    Route::post('barbers', [BarberController::class, 'store'])->name('barbers.store');
    Route::get('barbers/{id}', [BarberController::class, 'show'])->name('barbers.show');
    Route::get('barbers/{id}/edit', [BarberController::class, 'edit'])->name('barbers.edit');
    Route::put('barbers/{id}', [BarberController::class, 'update'])->name('barbers.update');
    Route::delete('barbers/{id}', [BarberController::class, 'destroy'])->name('barbers.destroy'); 
    //Appointments Management
    Route::get('appointments', [AppointmentController::class, 'index'])->name('appointments');

    //Clients Management
    Route::get('clients', [ClientController::class, 'index'])->name('clients');
    Route::get('clients/create', [ClientController::class, 'create'])->name('clients.create');
    Route::post('clients', [ClientController::class, 'store'])->name('clients.store'); 
    Route::get('clients/{id}', [ClientController::class, 'show'])->name('clients.show');
    Route::get('clients/{id}/edit', [ClientController::class, 'edit'])->name('clients.edit');
    Route::put('clients/{id}', [ClientController::class, 'update'])->name('clients.update');
    Route::delete('clients/{id}', [ClientController::class, 'destroy'])->name('clients.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
