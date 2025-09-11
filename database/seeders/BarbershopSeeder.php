<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Barbershop\Barbershop;

class BarbershopSeeder extends Seeder
{
    public function run(): void
    {
        App\Models\Barbershop\Barbershop::create([
            'name' => 'Rafles Barbershop',
            'address' => 'Calle Ficticia 123',
            'phone' => '555-123-4567',
            'email' => 'demo@barbershop.com',
        ]);
    }
}
