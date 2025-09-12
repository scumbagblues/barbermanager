<?php

namespace App\Http\Controllers\BarberShop;

use App\Http\Controllers\Controller;
use App\Models\Barbershop\Appointment;
use App\Models\Barbershop\Client; 
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    // NOTA IMPORTANTE:
    // Inertia busca la vista por el nombre que se le pasa aquí ('dashboard').
    // Si el archivo JS/TS del frontend se llama 'dashboard.tsx', debe usarse en minúsculas.
    // Aunque Laravel puede mostrar un warning "Inertia view [dashboard] not found", la vista se carga correctamente si el nombre coincide.
    // Este warning se puede ignorar si la app funciona bien.
    {   
        $date = request()->input('date', Carbon::today()->toDateString());
        $appointments = $this->getTodayAppointments($date);
        $clients = $this->getTodayClients($date);
        return inertia('dashboard', [
            'todayAppointments' => $appointments,
            'todayClients' => $clients,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    protected function getTodayAppointments($date = null)
    {
    $targetDate = $date ? Carbon::parse($date) : Carbon::today();
    $appointments = Appointment::whereDate('start_time', $targetDate)
            ->with(['client', 'barber', 'services'])
            ->orderBy('start_time', 'asc')
            ->get();

        $todayAppointments = $appointments->map(function($appointment) {
            return [
                'id' => $appointment->id,
                'start_time' => $this->getFormattedTodayAppointments($appointment->start_time),
                'client' => $appointment->client ? $appointment->client->name : null,
                'barber' => $appointment->barber ? $appointment->barber->name : null,
                'barber_color' => $appointment->barber ? $appointment->barber->color : null,
                'services' => $appointment->services->map(function($service) {
                    return $service->name;
                })->toArray(),
                'price' => $appointment->total_price,
                'status' => $appointment->status,
            ];
        })->toArray();     

        return $todayAppointments;
    }

    protected function getTodayClients($date = null)
    {
    $targetDate = $date ? Carbon::parse($date) : Carbon::today();
    return Client::whereDate('created_at', $targetDate)
            ->orderBy('created_at', 'asc')
            ->get();
    }

    protected function getFormattedTodayAppointments($timetoBeFormatted)
    {
        // Formatear la hora en formato 12h
        $date = \Carbon\Carbon::parse($timetoBeFormatted);
        $hours = $date->format('g');
        $minutes = $date->format('i');
        $ampm = $date->format('a');
        $formattedHour = ltrim($hours, '0') . ':' . $minutes . ' ' . $ampm;
        return $formattedHour;
    }
}
