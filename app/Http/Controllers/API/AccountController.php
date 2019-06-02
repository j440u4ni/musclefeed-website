<?php

namespace App\Http\Controllers\API;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\User; 
use JWTAuth;

class AccountController extends Controller
{
    public function login(Request $request) {
        try {
            $validator = Validator::make($request->all(), ['email' => 'required|string|email', 'password' => 'required|string']);
            if($validator->fails()) { return response()->json(['error' => $validator->errors()->first()], 201); }
            $credentials = $request->only('email', 'password', 'is_admin');
                if(!$token = auth('api')->attempt($credentials)) { return response()->json(['error' => 'Authentification échoué.'], 201); }
                return response()->json(['success' => true, 'user' => User::where(['email' => $request->input('email')])->get(), 'access' => $token, 'expires' => auth('api')->factory()->getTTL() * 60], 200);
        } catch(Exception $e) { return response()->json(['error' => $e->getMessage()], 201); }
    }

    public function register(Request $request) {
        try {
            $validator = Validator::make($request->all(), ['civility' => 'required', 'phone' => 'required|phone:FR,MA|unique:users', 'name' => 'required|string', 'password' => 'required|string', 'email' => 'required|string|unique:users']);
            if($validator->fails()) { return response()->json(['error' => $validator->errors()->first()], 201); }
                $user = new User; $user->name = $request->input('name'); $user->email = $request->input('email'); $user->token = Hash::make($request->input('name').time().$request->input('password')); $user->fidelity = 0;
                $user->deactivated = false; $user->civility = $request->input('civility'); $user->is_admin = false; $user->phone = $request->input('phone'); $user->password = Hash::make($request->input('password')); 
                $user->remember_token = \Str::random(10); $user->save();
                return response()->json(['success' => true, 'user' => $user->toArray(), 'access' => JWTAuth::fromUser($user), 'expires' => auth('api')->factory()->getTTL() * 60], 200);
        } catch(Exception $e) { return response()->json(['error' => $e->getMessage()], 201); }
    }

    public function tokenVerify(Request $request) {
        try { return response()->json(['success' => true], 200);
        } catch(Exception $e) { return response()->json(['error' => $e->getMessage()], 201); }
    }

    public function logout(Request $request) {
        try { auth('api')->logout(true); return response()->json(['success' => true], 200);
        } catch(Exception $e) { return response()->json(['error' => $e->getMessage()], 201); } 
    }
}
