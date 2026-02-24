<?php

// namespace App\Models;

// // use Illuminate\Contracts\Auth\MustVerifyEmail;
// use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Foundation\Auth\User as Authenticatable;
// use Illuminate\Notifications\Notifiable;
// use Laravel\Sanctum\HasApiTokens;


// class User extends Authenticatable
// {
//     use HasApiTokens;
//     /** @use HasFactory<\Database\Factories\UserFactory> */
//     use HasFactory, Notifiable;

//     /**
//      * The attributes that are mass assignable.
//      *
//      * @var list<string>
//      */

//     protected $fillable = [
//         'name',
//         'email',
//         'password',
//         'role',
//     ];

//     /**
//      * The attributes that should be hidden for serialization.
//      *
//      * @var list<string>
//      */
//     protected $hidden = [
//         'password',
//         'remember_token',
//     ];

//     /**
//      * Get the attributes that should be cast.
//      *
//      * @return array<string, string>
//      */
//     protected function casts(): array
//     {
//         return [
//             'email_verified_at' => 'datetime',
//             'password' => 'hashed',
//         ];
//     }
// }

// namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Model;

// class Task extends Model
// {
//     use HasFactory;

//     protected $fillable = [
//         'user_id',
//         'title',
//         'description',
//         'day',
//         'priority',
//         'completed',
//     ];

//     protected $casts = [
//         'completed' => 'boolean',
//     ];

//     // 🔹 Relationship: Task belongs to a User
//     public function user()
//     {
//         return $this->belongsTo(User::class);
//     }
// }




namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Mass assignable attributes
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',    // 0 = user, 1 = admin
        'status',  // active | blocked
    ];

    /**
     * Hidden attributes
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Cast attributes
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'role' => 'integer',
    ];

    // 🔹 Relationship: User has many tasks
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    // 🔹 Helper method (optional but clean)
    public function isAdmin(): bool
    {
        return $this->role === 1;
    }
}
