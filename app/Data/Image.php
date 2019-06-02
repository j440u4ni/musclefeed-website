<?php

namespace App\Data;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = ['name', 'url', 'slideshow'];

    public function products() { return $this->hasOne(Product::class); }
    public function categories() { return $this->hasOne(Category::class); }
}
