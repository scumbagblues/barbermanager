<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServicesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Barbershop\Service::create([
            'name' => 'Corte de Cabello',
            'duration' => 30,
            'description' => 'A standard haircut.',
            'price' => 180.00,
        ]);

        \App\Models\Barbershop\Service::create([
            'name' => 'Afeitado Clásico',
            'duration' => 15,
            'description' => 'A classic shave.',
            'price' => 200.00,
        ]);

        \App\Models\Barbershop\Service::create([
            'name' => 'Corte de cabello y Afeitado',
            'duration' => 45,
            'description' => 'A haircut and shave combo.',
            'price' => 300.00,
        ]);
        \App\Models\Barbershop\Service::create([
            'name' => 'Corte de Cabello para Niños',
            'duration' => 20,
            'description' => 'A haircut for children.',
            'price' => 150.00,
        ]);
    }
}
