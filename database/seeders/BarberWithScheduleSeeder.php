<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Barbershop\Barber;
use App\Models\Barbershop\BarberSchedule;

class BarberWithScheduleSeeder extends Seeder
{
    public function run(): void
    {
        // Crear barbero
        $barber = Barber::create([
            'name' => 'Rafles Cortes',
            'email' => 'rafles@example.com',
            'phone' => '1234567890',
            'address' => '123 Barber St',
            'barbershop_id' => 1,
            // Agrega otros campos si tu modelo lo requiere
        ]);

        // Crear horarios de lunes (0) a viernes (4)
        foreach (range(0, 4) as $dayOfWeek) {
            BarberSchedule::create([
                'barber_id' => $barber->id,
                'day_of_week' => $dayOfWeek,
                'start_hour' => '10:00:00',
                'end_hour' => '20:00:00',
            ]);
        }
    }
}
