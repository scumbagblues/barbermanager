<?php
namespace Database\Seeders;


class UserSeeder extends Seeder
{
    public function run(): void
    {
    App\Models\User::create([
            'name' => 'Usuario Demo',
            'email' => 'demo@barbermanager.com',
            'password' => Hash::make('Barbermanager123'),
        ]);
    }
}
