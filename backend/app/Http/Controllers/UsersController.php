<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Signer\Key;
use Lcobucci\JWT\Signer\Hmac\Sha256;

class UsersController extends CrudController
{
  public function __construct(User $model, Request $request)
  {
    $this->model = $model;
    $this->request = $request;
  }

  public function store()
  {
    try {
      $this->request->validate($this->getValidationRules());
    } catch (ValidationException $e) {
      return response($e->errors(), 400);
    }

    $newUser = $this->model;

    $newUser->fill($this->request->all());
    $newUser->password = Hash::make($this->request->password);

    $newUser->save();

    return response()->json(['message' => 'User Created'], 201);
  }

  public function login()
  {
    try {
      $this->request->validate([
        'email' => 'required|email|max:255',
        'password' => 'required|max:255',
      ]);
    } catch (ValidationException $e) {
      return response($e->errors(), 400);
    }

    $user = $this->model;
    $userObj = $user::firstWhere('email', $this->request->email);
    
    if (Hash::check($this->request->password, $userObj->password)) {
      $jwt_signer = new Sha256;
      $jwt_secret = env('JWT_KEY');
      $current_time = time();

      $jwt_token = (new Builder())
        ->withClaim("id", $userObj->id)
        ->issuedAt($current_time)
        ->expiresAt($current_time + 3600)
        ->getToken($jwt_signer, new Key($jwt_secret));

      return response()->json([
        'message' => 'User logged in', 
        'token' => strval($jwt_token),
        'user' => $userObj,
      ], 201);
    } else {
      return response()->json(['message' => 'Authentication Error'], 401);
    }
  }

  public function getValidationRules() 
  {
    return [
      'name' => 'required|max:255',
      'email' => 'required|email|max:255',
      'password' => 'required'
    ];
  }
}