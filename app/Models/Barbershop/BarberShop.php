<?php

namespace App\Models\Barbershop;

use Illuminate\Database\Eloquent\Model;

class Barbershop extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
    ];

    protected $table = 'barbershop';
}
