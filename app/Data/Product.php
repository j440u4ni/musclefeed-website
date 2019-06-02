<?php

namespace App\Data;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'description_title', 'quantity', 'provider', 'top'];
}
