<?php

namespace App\Data;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['owner', 'price', 'content', 'main_address', 'secondary_address', 'city', 'country',
        'owner', 'status'];
}
