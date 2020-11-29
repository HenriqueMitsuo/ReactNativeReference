<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = ['name', 'email'];

  /**
   * The attributes excluded from the model's JSON form.
   *
   * @var array
   */
  protected $hidden = ['password'];

  public function posts()
  {
    return $this->hasMany(Post::class);
  }
}