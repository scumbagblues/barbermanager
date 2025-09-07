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
        Schema::create('barber_schedules', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('barber_id');
            $table->unsignedTinyInteger('day_of_week'); // 0=lunes, 6=domingo
            $table->time('start_hour');
            $table->time('end_hour');
            $table->timestamps();

            $table->foreign('barber_id')->references('id')->on('barbers')->onDelete('cascade');
        });

        Schema::create('barber_vacations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('barber_id');
            $table->date('date');
            $table->timestamps();

            $table->foreign('barber_id')->references('id')->on('barbers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('barber_vacations');
        Schema::dropIfExists('barber_schedules');
    }
};
