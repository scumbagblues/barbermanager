<?php
namespace Database\Seeders;


class BarberWithScheduleSeeder extends Seeder
{
    public function run(): void
    {
        $barbersData = [
            [
                'name' => 'Rafles Cortes',
                'email' => 'rafles@example.com',
                'phone' => '1234567890',
                'address' => '123 Barber St',
                'barbershop_id' => 1,
            ],
            [
                'name' => 'Luis Fade',
                'email' => 'luisfade@example.com',
                'phone' => '2345678901',
                'address' => '456 Fade Ave',
                'barbershop_id' => 1,
            ],
            [
                'name' => 'Carlos Tijeras',
                'email' => 'carlostijeras@example.com',
                'phone' => '3456789012',
                'address' => '789 Tijeras Blvd',
                'barbershop_id' => 1,
            ],
            [
                'name' => 'Miguel Navaja',
                'email' => 'miguelnavaja@example.com',
                'phone' => '4567890123',
                'address' => '101 Navaja Rd',
                'barbershop_id' => 1,
            ],
        ];

        foreach ($barbersData as $barberData) {
            $barber = App\Models\Barbershop\Barber::create($barberData);
            foreach (range(0, 4) as $dayOfWeek) {
                App\Models\Barbershop\BarberSchedule::create([
                    'barber_id' => $barber->id,
                    'day_of_week' => $dayOfWeek,
                    'start_hour' => '10:00:00',
                    'end_hour' => '20:00:00',
                ]);
            }
        }
    }
}
