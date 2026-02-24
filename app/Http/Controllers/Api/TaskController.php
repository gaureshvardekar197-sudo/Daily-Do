<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // 🔹 List tasks (optional filter: today / tomorrow / later)
    public function index(Request $request)
    {
        $day = $request->query('day');

        $tasks = Task::where('user_id', auth()->id())
            ->when($day, fn ($q) => $q->where('day', $day))
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($tasks);
    }

    // 🔹 Create task
    public function store(Request $request)
    {
        $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'day'         => 'required|in:today,tomorrow,later',
            'priority'    => 'required|in:low,medium,high',
            'completed'   => 'required|boolean',
        ]);

        $task = Task::create([
            'user_id'     => auth()->id(),
            'title'       => $request->title,
            'description' => $request->description,
            'day'         => $request->day,
            'priority'    => $request->priority,
            'completed'   => $request->completed,
        ]);

        return response()->json($task, 201);
    }

    // 🔹 Update task
    public function update(Request $request, Task $task)
    {
        // Ensure task belongs to authenticated user
        if ($task->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'title'       => 'sometimes|string|max:255',
            'description' => 'sometimes|nullable|string',
            'day'         => 'sometimes|in:today,tomorrow,later',
            'priority'    => 'sometimes|in:low,medium,high',
            'completed'   => 'sometimes|boolean',
        ]);

        $task->update($request->only([
            'title', 'description', 'day', 'priority', 'completed'
        ]));

        return response()->json($task);
    }

    // 🔹 Toggle Pending / Completed
    public function toggleComplete(Task $task)
    {
        if ($task->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $task->update([
            'completed' => !$task->completed
        ]);

        return response()->json($task);
    }

    // 🔹 Delete task
    public function destroy(Task $task)
    {
        if ($task->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $task->delete();

        return response()->json(['message' => 'Task deleted successfully']);
    }
}
