<?php

namespace App\Models\Barbershop;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'name',
        'duration',
        'description',
        'price',
    ];

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
}
