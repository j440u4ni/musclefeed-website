<?php

namespace App\Data;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = ['name', 'url', 'slideshow'];
}
