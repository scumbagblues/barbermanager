<?php

namespace App\Http\Controllers\BarberShop;

use App\Http\Controllers\Controller;
use App\Models\Barbershop\Barber;
use App\Models\Barbershop\Barbershop;
use App\Models\Barbershop\Barberschedule;
use App\Models\Barbershop\Barbervacation;
use Illuminate\Http\Request;

class BarberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {   
        $barbers = Barber::all(); // Obtén todos los barberos
        
        return inertia('barbers', [
            'barbers' => $barbers,
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
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:barbers,email',
            'phone' => 'required|string|max:15|unique:barbers,phone',
            'address' => 'nullable|string|max:255',
        ]);

        // Get Barbershop ID from Barber Shop Table
        $barbershopId = Barbershop::first()->id;
        $request->merge(['barbershop_id' => $barbershopId]);

        //Store the barber in the database
        Barber::create($request->all());

        return redirect()->route('barbers')->with('success', 'Barber created successfully.');
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
        $barber = Barber::findOrFail($id);
        $schedules = Barberschedule::where('barber_id', $barber->id)->get();
        $vacations = Barbervacation::where('barber_id', $barber->id)->pluck('date')->toArray();
  
        return inertia('barbershop/edit-barber', [
            'barber' => $barber,
            'schedules' => $schedules,
            'vacations' => $vacations,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:barbers,email,' . $id,
            'phone' => 'required|string|max:15|unique:barbers,phone,' . $id,
            'address' => 'nullable|string|max:255',
        ]);

        $barber = Barber::findOrFail($id);
        $barber->update($request->only(['name', 'email', 'phone', 'address']));

        // Guardar horarios
        Barberschedule::where('barber_id', $barber->id)->delete();
        $schedules = collect(range(0, 6))
            ->map(function ($i) use ($request, $barber) {
                $start = $request->input("schedule_{$i}_start");
                $end = $request->input("schedule_{$i}_end");
                if ($start && $end) {
                    return [
                        'barber_id' => $barber->id,
                        'day_of_week' => $i,
                        'start_hour' => $start,
                        'end_hour' => $end,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
                return null;
            })
            ->filter()
            ->values()
            ->all();

        if (!empty($schedules)) {
            Barberschedule::insert($schedules);
        }

        // Guardar vacaciones
        Barbervacation::where('barber_id', $barber->id)->delete();
        $vacations = $request->input('vacations', []);
        if (is_array($vacations)) {
            foreach ($vacations as $date) {
                if ($date) {
                    Barbervacation::create([
                        'barber_id' => $barber->id,
                        'date' => $date,
                    ]);
                }
            }
        }

        return redirect()->route('barbers')->with('success', 'Barbero actualizado.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $barber = Barber::findOrFail($id);
        $barber->delete();

        return redirect()->route('barbers')->with('success', 'Barber eliminado.');
    }
}
