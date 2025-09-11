<?php

use App\Models\Barbershop\Barbershop;

test('puede crear un barbershop', function () {
    $barbershop = Barbershop::create([
        'name' => 'Test Barbershop',
        'address' => 'Test Address',
        'phone' => '1234567890',
        'email' => 'test@barbershop.com',
    ]);

    expect($barbershop)->toBeInstanceOf(Barbershop::class);
    expect($barbershop->name)->toBe('Test Barbershop');
    expect($barbershop->address)->toBe('Test Address');
    expect($barbershop->phone)->toBe('1234567890');
    expect($barbershop->email)->toBe('test@barbershop.com');
});
