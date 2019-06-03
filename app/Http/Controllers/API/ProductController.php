<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

use App\Data\Perfume;
use App\Data\Category;
use App\Data\Weight;
use App\Data\Image;
use App\Data\Product;
use Storage;

class ProductController extends Controller
{
    public function specifics(Request $request) {
        try {
            $perfumeCount = Perfume::all(); $weightCount = Weight::all();
            $categoryCount = Category::all(); $imageCount = Image::all();
            $productCount = Product::all();
            return response()->json(['success' => true, 'weights' => $weightCount, 'categories' => $categoryCount, 'perfumes' => $perfumeCount, 'images' => $imageCount, 'products' => $productCount], 200);
        } catch(Exception $e) { return response()->json(['error' => $e->getMessage()], 201); }
    }

    public function categoryAdd(Request $request) {
        try { $validator = Validator::make($request->all(), [ 'name' => 'required|string|min:4', 'description' => 'required|string|min:4', 'parent' => 'required' ]);
            if($validator->fails()) { return response()->json(['error' => $validator->errors()->first()], 201); }
            $category = new Category;
                $category->name = $request->input('name'); $category->description = $request->input('description'); 
                $category->category_id = $request->input('parent');     
                    if($request->exists('image') && $request->input('image') !== 0) { $category->image_id = $request->input('image'); }
                    $category->save();
            return response()->json(['success' => true ], 200);
        } catch(Exception $e) { return response()->json(['error' => $e->getMessage()], 201); }
    }
    public function categoryDelete(Request $request) {
        //delete
    }

    public function weightAdd(Request $request) {
        try { $validator = Validator::make($request->all(), [ 'name' => 'required|string|min:4', 'value' => 'required' ]);
            if($validator->fails()) { return response()->json(['error' => $validator->errors()->first()], 201); }
            $weight = new Weight;
                $weight->name = $request->input('name'); $weight->value = $request->input('value'); $weight->save();
            return response()->json(['success' => true ], 200);
        } catch(Exception $e) { return response()->json(['error' => $e->getMessage()], 201); }
    }
    public function weightDelete(Request $request) {
        //delete
    }

    public function perfumeAdd(Request $request) {
        try { $validator = Validator::make($request->all(), [ 'name' => 'required|string|min:4', 'description' => 'required|string|min:4' ]);
            if($validator->fails()) { return response()->json(['error' => $validator->errors()->first()], 201); }
            $perfume = new Perfume;
                $perfume->name = $request->input('name');
                $perfume->description = $request->input('description'); 
                $perfume->save();
            return response()->json(['success' => true ], 200);
        } catch(Exception $e) { return response()->json(['error' => $e->getMessage()], 201); }
    }
    public function perfumeDelete(Request $request) {
        //delete
    }

    public function imageAdd(Request $request) {
        try { $validator = Validator::make($request->all(), ['image' => 'required|string']);
            if($validator->fails()) { return response()->json(['error' => $validator->errors()->first()], 201); } 
            $image = $request->input('image');  $extension = explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
            $name = md5(time()).'.'.$extension; $content = \Image::make($request->input('image'))->encode($extension); $file = Storage::disk('public')->put($name, $content);
                $model = new Image; $model->name = $name; $model->url = 'app/public/'.$name; $model->save();
            return response()->json(['success' => true, 'images' => Image::all()], 200);
        } catch(Exception $e) { return response()->json(['error' => $e->getMessage() , 'url' => storage_path('app/public/products/').$name ], 201); }
    }
    public function imageDelete(Request $request) {
        try { $validator = Validator::make($request->all(), ['id' => 'required']);
            if($validator->fails()) { return response()->json(['error' => $validator->errors()->first()], 201); } 
            $destroy = Image::destroy($request->input('id'));
                if($destroy) { return response()->json(['success' => true, 'images' => Image::all()->toArray()], 200); }
                else { return response()->json(['error' => 'Can\'t delete image'], 201); }
        } catch(Exception $e) { return response()->json(['error' => $e->getMessage()], 201); }
    }
    public function imageSlideshow(Request $request) {
        try { $validator = Validator::make($request->all(), ['id' => 'required']);
            if($validator->fails()) { return response()->json(['error' => $validator->errors()->first()], 201); }
            Image::where(['id' => $request->input('id')])->update(['slideshow' => true]);
            return response()->json(['success' => true, 'images' => Image::all()->toArray()], 200);
        } catch(Exception $e) { return response()->json(['error' => $e->getMessage()], 201); }
    }

    public function productAdd(Request $request) {
        try { $validator = Validator::make($request->all(), ['name' => 'required|string|unique:products', 'provider' => 'required|string', 'description_title' => 'required|string|unique:products', 'quantity' => 'required', 'description' => 'required|string', 'details' => 'required|string', 'category' => 'required', 'image' => 'required' ]);
             if($validator->fails()) { return response()->json(['error' => $validator->errors()->first()], 201); }
             $product = new Product;
                $product->name = $request->input('name'); $product->description_title = $request->input('description_title');
                $product->provider = $request->input('provider'); $product->description_title = $request->input('description_title');
                $product->url = str_slug($request->input('name')); $product->quantity = $request->input('quantity');
                $product->description = $request->input('description'); $product->details = $request->input('details');
                $product->category_id = $request->input('category'); $product->image_id = $request->input('image');
                $product->sold = 0;
                $product->save();
             return response()->json(['success' => true], 200);
        } catch(Exception $e) { return response()->json(['error' => $e->getMessage()], 201); }
    }
}
