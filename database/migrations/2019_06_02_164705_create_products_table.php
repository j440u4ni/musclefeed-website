<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('image_id')->unsigned();
            $table->bigInteger('category_id')->unsigned();
            $table->string('name')->unique();
            $table->string('url')->unique();
            $table->string('description_title')->unique();
            $table->string('provider');
            $table->integer('quantity');
            $table->boolean('top')->default(false);
            $table->double('promotion')->default(0.0);
            $table->longText('details');
            $table->longText('description');
            $table->integer('sold');

            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('image_id')->references('id')->on('images')->onDelete('cascade');
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
        Schema::dropIfExists('products');
    }
}
