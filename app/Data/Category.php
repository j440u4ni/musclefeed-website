<?php

namespace App\Data;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [ 'name', 'description', 'category_id', 'image_id' ];
    
    public function products() { return $this->hasOne(Product::class); }
    public function images() { return $this->hasOne(Image::class); }
}
