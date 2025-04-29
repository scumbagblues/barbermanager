<?php

namespace App\Http\Controllers\BarberShop;

use App\Http\Controllers\Controller;
use App\Models\Barbershop\Barber;
use App\Models\Barbershop\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get all clients
        $clients = Client::with('barber')->get(); // Incluye la relación con barberos
        $barbers = Barber::all();

        return inertia('clients', [
            'clients' => $clients,
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
        
        // Obtener el ID del barbershop desde la tabla de barber shops
        $barbershopId = Barber::first()->barbershop_id;
        $request->merge(['barbershop_id' => $barbershopId]);
        // Validar los datos del formulario
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:clients,email',
            'phone' => 'required|string|max:15|unique:clients,phone',
            'address' => 'nullable|string|max:255',
            'barber_id' => 'required|exists:barbers,id', // Asegúrate de que el barbero exista
        ]);

        // Crear el cliente en la base de datos
        Client::create($request->all());

        // Redirigir con un mensaje de éxito
        return redirect()->route('clients')->with('success', 'Client created successfully.');
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
        $barbers = Barber::all();
        $client = Client::findOrFail($id);
        return inertia('clients/edit-client', [
            'client' => $client,
            'barbers' => $barbers,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Validar los datos del formulario
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:clients,email,' . $id,
            'phone' => 'required|string|max:15|unique:clients,phone,' . $id,
            'address' => 'nullable|string|max:255',
            'barber_id' => 'required|exists:barbers,id', // Asegúrate de que el barbero exista
        ]);

        // Actualizar el cliente en la base de datos
        $client = Client::findOrFail($id);
        $client->update($request->all());

        // Redirigir con un mensaje de éxito
        return redirect()->route('clients')->with('success', 'Client updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Eliminar el cliente de la base de datos
        $client = Client::findOrFail($id);
        $client->delete();

        // Redirigir con un mensaje de éxito
        return redirect()->route('clients')->with('success', 'Client deleted successfully.');
    }
}
