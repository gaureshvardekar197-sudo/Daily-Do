<?php

// namespace App\Http\Middleware;

// // app/Http/Middleware/AdminMiddleware.php
// use Closure;
// use Illuminate\Http\Request;
// use Symfony\Component\HttpFoundation\Response;

// class AdminMiddleware
// {
//     public function handle(Request $request, Closure $next): Response
//     {
//         if ($request->user()->role !== 'admin') {
//             return response()->json([
//                 'message' => 'Unauthorized. Admin only.'
//             ], 403);
//         }

//         return $next($request);
//     }
// }



namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user() || $request->user()->role !== 1) {
            return response()->json([
                'message' => 'Unauthorized. Admin only.'
            ], 403);
        }

        return $next($request);
    }
}
