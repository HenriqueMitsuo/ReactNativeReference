<?php

namespace App\Http\Controllers;

use App\Models\Post;

use Illuminate\Http\Request;

class PostsController extends CrudController 
{
  public function __construct(Post $model, Request $request)
  {
    $this->model = $model;
    $this->request = $request;
  }

  protected function applyFilters(Request $request, $query) 
  {
    if ($request->has('user_id')) {
      $query->where('user_id', $request->user_id);
    }

    if ($request->has('with_user')) {
      $query->with('user:id,name');
    }

    $query->orderBy('updated_at', 'desc');
  }

  public function getValidationRules() 
  {
    return [
      'text' => 'required|max:280',
    ];
  }
}