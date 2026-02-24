<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'day',
        'priority',
        'completed',
    ];

    protected $casts = [
        'completed' => 'boolean', // ensures completed is always boolean
    ];
    // 🔹 Relationship: Task belongs to a User
     public function user()
     {
         return $this->belongsTo(User::class);
     }
}
