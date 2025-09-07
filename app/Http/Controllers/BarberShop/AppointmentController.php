<?php
namespace App\Http\Controllers\BarberShop;

use App\Http\Controllers\Controller;
use App\Models\Barbershop\Appointment;
use App\Models\Barbershop\Barber;
use App\Models\Barbershop\Client;
use App\Models\Barbershop\Service;
use App\Models\Barbershop\BarberSchedule;
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
        $barbers = Barber::all(['id', 'name']);
        $clients = Client::all(['id', 'name']);
        $services = Service::all(['id', 'name', 'duration', 'price']);
        
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


        // Si se reciben 'date' y 'start_time' por separado, unirlos en formato 'Y-m-dTH:i'
        $date = $request->input('date');
        $startHour = $request->input('start_time');
        if ($date && $startHour && preg_match('/^\d{4}-\d{2}-\d{2}$/', $date) && preg_match('/^\d{2}:\d{2}$/', $startHour)) {
            $startTime = $date . 'T' . $startHour;
            $request->merge(['start_time' => $startTime]);
        }

        $validated = $request->validate([
            'barber_id' => 'required|exists:barbers,id',
            'client_id' => 'required|exists:clients,id',
            'service_ids' => 'required|array|min:1',
            'service_ids.*' => 'exists:services,id',
            'start_time' => 'required',
            'notes' => 'nullable|string',
        ]);

        // Obtener servicios seleccionados
    $services = Service::whereIn('id', $validated['service_ids'])->get();
    $totalDuration = $services->sum('duration');
    $totalPrice = $services->sum('price');
    
    $start = new \Carbon\Carbon($validated['start_time']);
    $end = (clone $start)->addMinutes($totalDuration);
        
        // Validar disponibilidad del barbero
        $exists = Appointment::where('barber_id', $validated['barber_id'])
            ->where(function($query) use ($start, $end) {
                $query->whereBetween('start_time', [$start, $end])
                      ->orWhereBetween('end_time', [$start, $end]);
            })
            ->exists();

        if ($exists) {
            return back()->withErrors(['start_time' => 'El barbero no está disponible en ese horario.']);
        }

        $appointment = Appointment::create([
            'barber_id' => $validated['barber_id'],
            'client_id' => $validated['client_id'],
            'start_time' => $start,
            'end_time' => $end,
            'total_price' => $totalPrice,
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

    public function getBarberAppointments($barberId, $date)
    {
       // Si se recibe barber_id y date, consultar las citas de ese barbero en ese día
        // \Log::info('Barber Request:', ['barber_id' => $barberId, 'date' => $date]);
        $barberAppointments = [];
        $barberSchedules = [];

        if ($barberId && $date) {
            $barberAppointments = Appointment::where('barber_id', $barberId)
                ->whereDate('start_time', $date)
                ->get();
            // Ajustar para que 0 = lunes, 6 = domingo (como en la migración)
            $carbonDate = \Carbon\Carbon::parse($date);
            // Carbon: 0=domingo, 1=lunes, ..., 6=sábado
            // Migración: 0=lunes, ..., 6=domingo
            $carbonDay = $carbonDate->dayOfWeek; // 0=domingo, 1=lunes, ..., 6=sábado
            $dayOfWeek = $carbonDay === 0 ? 6 : $carbonDay - 1; // 0=lunes, ..., 6=domingo
            $barberSchedules = BarberSchedule::where('barber_id', $barberId)
                ->where('day_of_week', $dayOfWeek)
                ->get()
                ->map(function($schedule) {
                    // Normalizar formato de hora a 'HH:mm'
                    $schedule->start_hour = substr($schedule->start_hour, 0, 5);
                    $schedule->end_hour = substr($schedule->end_hour, 0, 5);
                    return $schedule;
                });
        }
        $appointments = collect($barberAppointments)->values()->toArray();
        $schedules = collect($barberSchedules)->values()->toArray();
        //\Log::info('BarberSchedules:', ['barber_id' => $barberId, 'date' => $date, 'day_of_week' => isset($dayOfWeek) ? $dayOfWeek : null, 'schedules' => $schedules]);
        return response()->json([
            'appointments' => $appointments,
            'schedules' => $schedules,
        ]);
    }
}
