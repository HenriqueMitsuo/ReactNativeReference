<?php

namespace App\Http\Middleware;

use Closure;

use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Signer\Key;
use Lcobucci\JWT\Signer\Hmac\Sha256;

use Lcobucci\JWT\Parser;

class VerifyJwtToken
{
  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Closure  $next
   * @return mixed
   */
  public function handle($request, Closure $next)
  {
    $jwt_signer = new Sha256;
    $jwt_secret = env('JWT_KEY');

    try {
      // Pegando o token do header Authorization: bearer <token...>
      $bearer_token = $request->header('Authorization');

      // Isolando o token em uma variavel
      // token[0] = bearer
      // token[1] = <token...>
      $token = explode(" ", $bearer_token);

      // Tratando a string do token tirando todos espaços em branco
      $jwt_token = trim($token[1], ' ');

      // Transformando a string em uma nova estancia do jwt
      $jwt_token = (new Parser())->parse((string) $jwt_token);

      if($jwt_token->verify($jwt_signer, $jwt_secret)){
        return $next($request);
      }
      else{
        return response()->json(['message' => 'Authentication Error'], 401);
      }
    } catch (\Throwable $th) {
      return response()->json(['message' => 'Authentication Error'], 401);
    }
  }
}