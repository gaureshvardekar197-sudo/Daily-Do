<?php

// namespace App\Http\Controllers\Api;

// use App\Http\Controllers\Controller;
// use Illuminate\Http\Request;

// class AdminController extends Controller

// {
//     public function dashboard()
//     {
//         return response()->json([
//             'message' => 'Welcome Admin 👑'
//         ]);
//     }
// }



namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Task;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    // 🔹 Admin Dashboard
    public function dashboard()
    {
        return response()->json([
            'message' => 'Welcome Admin 👑'
        ]);
    }

    // 🔹 View all users
    public function users()
    {
        return response()->json(
            User::select('id','name','email','role','status','created_at')->get()
        );
    }

    // 🔹 Block / Unblock user
    public function toggleUserStatus($id)
    {
        $user = User::findOrFail($id);

        $user->status = $user->status === 'active' ? 'blocked' : 'active';
        $user->save();

        return response()->json([
            'message' => 'User status updated',
            'status' => $user->status
        ]);
    }

    // 🔹 Change user role
    public function updateRole(Request $request, $id)
    {
        $request->validate([
            'role' => 'required|in:0,1'
        ]);

        $user = User::findOrFail($id);
        $user->role = $request->role;
        $user->save();

        return response()->json([
            'message' => 'Role updated'
        ]);
    }

    // 🔹 View all tasks (for admin)
    public function tasks()
    {
        return response()->json(
            Task::with('user:id,name,email')->latest()->get()
        );
    }

    // 🔹 Get tasks for a specific user (admin only)
    public function userTasks($userId)
    {
        $user = User::findOrFail($userId);
        
        $tasks = Task::where('user_id', $userId)
            ->latest()
            ->get();
            
        return response()->json([
            'user' => $user,
            'tasks' => $tasks
        ]);
    }

    // 🔹 Daily task completion stats
    public function dailyStats()
    {
        $total = Task::whereDate('created_at', today())->count();
        $completed = Task::whereDate('created_at', today())
            ->where('completed', true)
            ->count();

        return response()->json([
            'total' => $total,
            'completed' => $completed,
            'percentage' => $total ? round(($completed / $total) * 100) : 0
        ]);
    }
}
