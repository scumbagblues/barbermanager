<?php

namespace App\Models\Barbershop;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'barbershop_id',
        'barber_id',
    ];

    public function barbershop()
    {
        return $this->belongsTo(BarberShop::class, 'barbershop_id');
    }
    public function barber()
    {
        return $this->belongsTo(Barber::class, 'barber_id');
    }
    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }   
}
