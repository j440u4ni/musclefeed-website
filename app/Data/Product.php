<?php

namespace App\Data;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'description_title', 'quantity', 'provider', 'top', 'promotion', 'image_id', 'category_id', 'sold', 'details', 'url', 'description'];

    public function images() { return $this->hasOne(Image::class); }
    public function categories() { return $this->hasOne(Category::class); }
}
