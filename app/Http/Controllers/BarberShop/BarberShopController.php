<?php

namespace App\Http\Controllers\BarberShop;

use App\Http\Controllers\Controller;
use App\Models\Barbershop\BarberShop;
use Illuminate\Http\Request;

class BarberShopController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $BarberShopSettings = Barbershop::first();
        return inertia('barbershop/settings', [
            'barberShopSettings' => $BarberShopSettings,
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
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'required|email|max:255',
        ]);

        $barberShopSettings = Barbershop::first();

        if ($barberShopSettings) {
            $barberShopSettings->update($validatedData);
        } else {
            Barbershop::create($validatedData);
        }

        return redirect()->route('barber-settings')
        ->with('success', 'Opciones de la barbería actualizadas.');
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
