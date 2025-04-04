<?php

namespace App\Models\Barbershop;

use Illuminate\Database\Eloquent\Model;

class Barber extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'barbershop_id',
    ];  
}
