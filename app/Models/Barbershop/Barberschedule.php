<?php

namespace App\Models\Barbershop;

use Illuminate\Database\Eloquent\Model;

class Barberschedule extends Model
{
    protected $fillable = [
        'barber_id',
        'day_of_week',
        'start_hour',
        'end_hour',
    ];

    protected $table = 'barber_schedules';

    public function barber()
    {
        return $this->belongsTo(Barber::class);
    }
}
