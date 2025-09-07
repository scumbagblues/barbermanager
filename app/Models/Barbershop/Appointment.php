<?php

namespace App\Models\Barbershop;

use Illuminate\Database\Eloquent\Model;


class Appointment extends Model
{
    protected $fillable = [
        'start_time',
        'end_time',
        'status',
        'total_price',
        'notes',
        'client_id',
        'barber_id',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function barber()
    {
        return $this->belongsTo(Barber::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function services()
    {
        return $this->belongsToMany(Service::class, 'appointment_service');
    }
}
