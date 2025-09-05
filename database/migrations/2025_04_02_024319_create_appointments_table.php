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
        Schema::create('appointments', function (Blueprint $table) {
                $table->id();
                $table->dateTime('start_time'); // inicio de la cita
                $table->dateTime('end_time');   // fin de la cita
                $table->string('status')->default('pending'); // pending, confirmed, canceled
                $table->text('notes')->nullable(); // additional notes for the appointment
                $table->unsignedBigInteger('client_id');
                $table->unsignedBigInteger('barber_id');
                $table->unsignedBigInteger('service_id'); // foreign key to services table
                $table->timestamps();

                $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade');
                $table->foreign('barber_id')->references('id')->on('barbers')->onDelete('cascade');
                $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
