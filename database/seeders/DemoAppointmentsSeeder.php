<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Barbershop\Appointment;
use App\Models\Barbershop\Client;
use App\Models\Barbershop\Barber;
use App\Models\Barbershop\Service;
use Carbon\Carbon;

class DemoAppointmentsSeeder extends Seeder
{
    public function run(): void
    {
    $barbers = Barber::all();
    $clients = Client::all();
    $services = Service::all();
        $statuses = ['Pendiente', 'Confirmada', 'Cancelada'];
        $startDate = Carbon::now()->startOfWeek();

    for ($i = 0; $i < 50; $i++) {
            $barber = $barbers->random();
            $client = $clients->random();
            $serviceSet = $services->random(rand(1, 2));
            if ($serviceSet instanceof \Illuminate\Support\Collection) {
                $serviceIds = $serviceSet->pluck('id')->toArray();
                $totalDuration = $serviceSet->sum('duration');
                $totalPrice = $serviceSet->sum('price');
            } else {
                $serviceIds = [$serviceSet->id];
                $totalDuration = $serviceSet->duration;
                $totalPrice = $serviceSet->price;
            }
            // Generar fechas en el futuro (hoy + $i días)
            $start = Carbon::now()->addDays($i)->setTime(rand(10, 18), rand(0, 1) * 30);
            $end = $start->copy()->addMinutes($totalDuration);
            $status = $statuses[array_rand($statuses)];

            $appointment = Appointment::create([
                'barber_id' => $barber->id,
                'client_id' => $client->id,
                'start_time' => $start,
                'end_time' => $end,
                'total_price' => $totalPrice,
                'notes' => 'Cita demo ' . ($i + 1),
                'status' => $status,
            ]);
            $appointment->services()->attach($serviceIds);
        }
    }
}
