<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Barbershop\Client;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        Client::create([
            'name' => 'Cliente Demo',
            'email' => 'cliente@demo.com',
            'phone' => '555-987-6543',
            'barber_id' => 1,
            'barbershop_id' => 1,
        ]);
    }
}
