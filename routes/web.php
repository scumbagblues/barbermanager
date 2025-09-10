<?php

use App\Http\Controllers\BarberShop\AppointmentController;
use App\Http\Controllers\BarberShop\BarberController;
use App\Http\Controllers\BarberShop\BarberShopController;
use App\Http\Controllers\BarberShop\ClientController;
use App\Http\Controllers\BarberShop\ServiceController;
use App\Http\Controllers\BarberShop\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;






Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    /*Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    */

    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

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

    //Services Management
    Route::get('services', [ServiceController::class, 'index'])->name('services');
    Route::get('services/create', [ServiceController::class, 'create'])->name('services.create');
    Route::post('services', [ServiceController::class, 'store'])->name('services.store');
    Route::get('services/{id}', [ServiceController::class, 'show'])->name('services.show');
    Route::get('services/{id}/edit', [ServiceController::class, 'edit'])->name('services.edit');
    Route::put('services/{id}', [ServiceController::class, 'update'])->name('services.update');
    Route::delete('services/{id}', [ServiceController::class, 'destroy'])->name('services.destroy');

    //Appointments Management
    Route::get('appointments', [AppointmentController::class, 'index'])->name('appointments');
    Route::get('appointments/create', [AppointmentController::class, 'create'])->name('appointments.create');
    Route::post('appointments', [AppointmentController::class, 'store'])->name('appointments.store');
    Route::get('appointments/{id}', [AppointmentController::class, 'show'])->name('appointments.show');
    Route::get('appointments/{id}/edit', [AppointmentController::class, 'edit'])->name('appointments.edit');
    Route::put('appointments/{id}', [AppointmentController::class, 'update'])->name('appointments.update');
    Route::put('appointments/{id}/status', [AppointmentController::class, 'updateStatus'])->name('appointments.updateStatus');
    Route::delete('appointments/{id}', [AppointmentController::class, 'destroy'])->name('appointments.destroy');
    Route::get('barbers/{barberId}/appointments/{date}', [AppointmentController::class, 'getBarberAppointments'])->name('barbers.appointments');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
