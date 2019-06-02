<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\User;
use Illuminate\Support\Str;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\Hash;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function (Faker $faker) {
    return [
        'name' => ($name = $faker->name),
        'email' => ($email = $faker->unique()->safeEmail),
        'email_verified_at' => now(),
        'password' => ($password = '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'), // password
        'remember_token' => Str::random(10),
        'token' => Hash::make($password.$name.time().$email),
        'fidelity' => 50.0,
        'civility' => false,
        'deactivated' => false,
        'is_admin' => false,
        'phone' => $faker->e164PhoneNumber
    ];
});
