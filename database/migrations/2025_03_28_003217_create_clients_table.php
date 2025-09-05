<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone')->unique();    
            $table->unsignedBigInteger('barbershop_id');
            $table->unsignedBigInteger('barber_id')->nullable();
            $table->timestamps();

            $table->foreign('barber_id')->references('id')->on('barbers')->onDelete('cascade');
            $table->foreign('barbershop_id')->references('id')->on('barbershop')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
