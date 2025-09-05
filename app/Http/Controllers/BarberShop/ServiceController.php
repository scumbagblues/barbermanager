<?php

namespace App\Http\Controllers\BarberShop;

use App\Http\Controllers\Controller;
use App\Models\Barbershop\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = Service::all();
        return inertia('barbershop/services', [
            'services' => $services,
        ]);
    }
    
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'duration' => 'required|integer|min:1',
            'description' => 'nullable|string|max:1000',
        ]);

        // Create a new service
        Service::create($request->all());

        // Redirect with a success message
        return redirect()->route('services')->with('success', 'Servicio creado.');
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
        $service = Service::findOrFail($id);
        return inertia('barbershop/edit-services', [
            'service' => $service,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Validate the request data
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'duration' => 'required|integer|min:1',
            'description' => 'nullable|string|max:1000',
        ]);

        // Find the service and update it
        $service = Service::findOrFail($id);
        $service->update($request->all());

        // Redirect with a success message
        return redirect()->route('services')->with('success', 'Servicio actualizado.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Find the service and delete it
        $service = Service::findOrFail($id);
        $service->delete();

        // Redirect with a success message
        return redirect()->route('services')->with('success', 'Servicio eliminado.');
    }
}
