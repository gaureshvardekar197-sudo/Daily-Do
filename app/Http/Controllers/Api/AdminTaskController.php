<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;

class AdminTaskController extends Controller
{
    // 🔹 Admin creates task for a specific user
    public function storeForUser(Request $request, $userId)
    {
        // Verify the user exists
        $user = User::findOrFail($userId);

        $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'day'         => 'required|in:today,tomorrow,later',
            'priority'    => 'required|in:low,medium,high',
            'completed'   => 'required|boolean',
        ]);

        $task = Task::create([
            'user_id'     => $userId, // Use the target user's ID
            'title'       => $request->title,
            'description' => $request->description,
            'day'         => $request->day,
            'priority'    => $request->priority,
            'completed'   => $request->completed,
        ]);

        return response()->json($task, 201);
    }

    // 🔹 Admin toggles any task
    public function toggleComplete($taskId)
    {
        $task = Task::findOrFail($taskId);
        
        $task->update([
            'completed' => !$task->completed
        ]);

        return response()->json($task);
    }

    // 🔹 Admin deletes any task
    public function destroy($taskId)
    {
        $task = Task::findOrFail($taskId);
        $task->delete();

        return response()->json(['message' => 'Task deleted successfully']);
    }
}