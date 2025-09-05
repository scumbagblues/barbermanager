<?php

namespace App\Http\Controllers\BarberShop;

use App\Http\Controllers\Controller;
use App\Models\Barbershop\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get all appointments
        $appointments = Appointment::all();

        return inertia('appointments/list', [
            'appointments' => $appointments,
        ]); 
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    $barbers = \App\Models\Barbershop\Barber::all(['id', 'name']);
    $clients = \App\Models\Barbershop\Client::all(['id', 'name']);
    $services = \App\Models\Barbershop\Service::all(['id', 'name', 'duration', 'price']);

        return inertia('appointments/appointment-create', [
            'barbers' => $barbers,
            'clients' => $clients,
            'services' => $services,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'barber_id' => 'required|exists:barbers,id',
            'client_id' => 'required|exists:clients,id',
            'service_ids' => 'required|array|min:1',
            'service_ids.*' => 'exists:services,id',
            'start_time' => 'required|date_format:Y-m-d\TH:i',
            'notes' => 'nullable|string',
        ]);

        // Obtener servicios seleccionados
        $services = \App\Models\Barbershop\Service::whereIn('id', $validated['service_ids'])->get();
        $totalDuration = $services->sum('duration');
        $start = new \Carbon\Carbon($validated['start_time']);
        $end = (clone $start)->addMinutes($totalDuration);

        // Validar disponibilidad del barbero
        $exists = \App\Models\Barbershop\Appointment::where('barber_id', $validated['barber_id'])
            ->where(function($query) use ($start, $end) {
                $query->whereBetween('start_time', [$start, $end])
                      ->orWhereBetween('end_time', [$start, $end]);
            })
            ->exists();

        if ($exists) {
            return back()->withErrors(['start_time' => 'El barbero no está disponible en ese horario.']);
        }

        $appointment = \App\Models\Barbershop\Appointment::create([
            'barber_id' => $validated['barber_id'],
            'client_id' => $validated['client_id'],
            'start_time' => $start,
            'end_time' => $end,
            'notes' => $validated['notes'] ?? null,
            'status' => 'pending',
        ]);

        $appointment->services()->attach($validated['service_ids']);

        return redirect()->route('appointments')->with('success', 'Cita creada correctamente.');
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
}
