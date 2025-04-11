<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::create([
            'name' => 'Admin',
            'email' => 'admin@email.com',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
            'remember_token' => null,
            'is_admin' => 1,
            'phone_number' => '1234567890',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
