<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;


class ShareBarberShopTitle
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {   
         // Obtener el título de la tienda desde la base de datos o el archivo .env
         $barberShopName = DB::table('barbershop')->value('name') 
         ?? env('BARBER_SHOP_TITLE', 'Default BarberShop Title');
        // Compartir el título con todas las vistas de Inertia
        inertia()->share('barberShopName', $barberShopName);
        return $next($request);
    }
}
