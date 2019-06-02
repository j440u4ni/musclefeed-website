<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->double('fidelity')->default(1.0);
            $table->string('token')->unique();
            $table->boolean('deactivated')->default(false);
            $table->boolean('civility')->default(false);
            $table->boolean('is_admin')->default(false);

            $table->string('phone')->nullable();
            $table->string('main_address')->nullable();
            $table->string('secondary_address')->nullable();
            $table->string('city')->nullable();
            $table->string('country')->nullable();
            
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
