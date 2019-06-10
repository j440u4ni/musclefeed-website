<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Stripe\Stripe;
use Stripe\Token;
use Stripe\Charge;
use Illuminate\Support\Facades\Validator;

class PaymentController extends Controller
{
    public function process(Request $request) {
        Stripe::setApiKey(env('STRIPE_SECRET')); 
        try { $validator = Validator::make($request->all(), ['main_address' => 'required|string', 'secondary_address' => 'required|string', 'name' => 'required|string', 'credit_name' => 'required|string',
                    'price' => 'required', 'token' => 'required|string', 'cart' => 'required|string', 'price' => 'required' ]);
            if($validator->fails()) { return response()->json(['error' => $validator->errors()->first()], 201); }
            $card = json_decode($request->token); 
            $token = Token::create(['card' => 
                ['number' => $card->{'card'}, 'exp_month' => $card->{'exp_month'}, 'exp_year' => $card->{'exp_year'}, 'cvc' => $card->{'cvc'},
                 'name' => $request->credit_name, 'address_line1' => $request->main_address, 'address_line2' => $request->secondary_address, 'address_city' => $request->city, 'address_country' => 'France',
                ]]);
                Charge::create([ 'amount' => $request->input('price') * 100, 'description' => $request->input('cart'), 'currency' => 'eur', 'source' => $token]);
            return response()->json(['success' => true, 'message' => 'Payment done'], 200);
        } catch(Exception $e) { return response()->json(['error' => $e->getMessage() ], 201); }
    }
}
