<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\User::class, 100)->create();
        // admin code special seed.
        App\User::create([
            'name' => ($name = 'Oussama Jaaouani'), 'email' => ($email = 'jaaouani@musclefeed.co'),
            'password' => ($password = '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
            'remember_token' => Str::random(10), 'token' => Hash::make($password.$name.time().$email),
            'fidelity' => 100.0, 'civility' => true, 'deactivated' => false, 'is_admin' => true, 'phone' => '+33646018759'
        ]);
    }
}
