
<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Barbershop\Client;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 1; $i <= 15; $i++) {
            Client::create([
                'name' => "Cliente Demo $i",
                'email' => "cliente$i@demo.com",
                'phone' => '555-987-' . str_pad($i, 4, '0', STR_PAD_LEFT),
                'barber_id' => 1,
                'barbershop_id' => 1,
            ]);
        }
    }
}
