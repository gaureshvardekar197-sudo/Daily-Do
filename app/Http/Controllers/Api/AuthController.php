<?php

// namespace App\Http\Controllers\Api;

// use App\Http\Controllers\Controller;
// use Illuminate\Http\Request;
// use App\Models\User;
// use Illuminate\Support\Facades\Hash;

// class AuthController extends Controller
// {
//     // REGISTER
//     public function register(Request $request)
//     {
//         $request->validate([
//             'name' => 'required|string',
//             'email' => 'required|email|unique:users',
//             'password' => 'required|min:6',
//         ]);

//         $user = User::create([
//             'name' => $request->name,
//             'email' => $request->email,
//             'password' => Hash::make($request->password),
//             'role' => '0', // default role as user
//         ]);

//         $token = $user->createToken('dailydo-token')->plainTextToken;

//         return response()->json([
//             'token' => $token,
//             'user' => $user
//         ], 201);
//     }

//     // LOGIN
//     public function login(Request $request)
//     {
//         $request->validate([
//             'email' => 'required|email',
//             'password' => 'required',
//         ]);

//         $user = User::where('email', $request->email)->first();

//         if (!$user || !Hash::check($request->password, $user->password)) {
//             return response()->json([
//                 'message' => 'Invalid credentials'
//             ], 401);
//         }

//         $token = $user->createToken('dailydo-token')->plainTextToken;

//         return response()->json([
//             'token' => $token,
//             'user' => $user
//         ]);
//     }

//     // LOGOUT
//     public function logout(Request $request)
//     {
//         $request->user()->currentAccessToken()->delete();

//         return response()->json([
//             'message' => 'Logged out successfully'
//         ]);
//     }
// }



namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // 🔹 Register
    public function register(Request $request)
    {
        $request->validate([
            'name'     => 'required|string',
            'email'    => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role'     => 0,
            'status'   => 'active'
        ]);

        $token = $user->createToken('dailydo-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user'  => $user
        ], 201);
    }

    // 🔹 Login
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        if ($user->status === 'blocked') {
            return response()->json(['message' => 'Account blocked'], 403);
        }

        $token = $user->createToken('dailydo-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user'  => $user
        ]);
    }

    // 🔹 Logout
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }
}
