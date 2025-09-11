use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
<?php
namespace Database\Seeders;


class UserSeeder extends Seeder
{
    public function run(): void
    {
    User::create([
            'name' => 'Usuario Demo',
            'email' => 'demo@barbermanager.com',
            'password' => Hash::make('Barbermanager123'),
        ]);
    }
}
