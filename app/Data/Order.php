<?php

namespace App\Data;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['owner', 'price', 'content'];
}
