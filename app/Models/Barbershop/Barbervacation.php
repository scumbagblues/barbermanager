<?php

namespace App\Models\Barbershop;

use Illuminate\Database\Eloquent\Model;

class BarberVacation extends Model
{
    protected $fillable = [
        'barber_id',
        'date',
    ];

    protected $table = 'barber_vacations';

    public function barber()
    {
        return $this->belongsTo(Barber::class);
    }
}
