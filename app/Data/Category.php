<?php

namespace App\Data;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [ 'name', 'description', 'category_id' ];
}
