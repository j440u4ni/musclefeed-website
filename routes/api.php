<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'v1/product'], function() {
    Route::get('/all-specifics', 'API\ProductController@specifics');
    Route::post('/add-perfume', 'API\ProductController@perfumeAdd')->middleware(['jwt.auth']); 
    Route::post('/add-category', 'API\ProductController@categoryAdd')->middleware(['jwt.auth']);
    Route::post('/add-weight', 'API\ProductController@weightAdd')->middleware(['jwt.auth']);
    Route::post('/add-image', 'API\ProductController@imageAdd')->middleware(['jwt.auth']);

    Route::post('/delete-perfume', 'API\ProductController@perfumeDelete')->middleware(['jwt.auth']); 
    Route::post('/delete-category', 'API\ProductController@categoryDelete')->middleware(['jwt.auth']);
    Route::post('/delete-weight', 'API\ProductController@weightDelete')->middleware(['jwt.auth']);
    Route::post('/delete-image', 'API\ProductController@imageDelete')->middleware(['jwt.auth']);

    Route::post('/slideshow-image', 'API\ProductController@imageSlideshow')->middleware(['jwt.auth']);
    Route::post('/add-product', 'API\ProductController@productAdd')->middleware(['jwt.auth']);
});

Route::group(['prefix' => 'v1/account'], function() {
    Route::post('/login', 'API\AccountController@login'); 
    Route::post('/register', 'API\AccountController@register'); 
    Route::get('/token-verification', 'API\AccountController@tokenVerify')->middleware(['jwt.auth']);
    Route::get('/logout', 'API\AccountController@logout')->middleware(['jwt.auth']);
});

Route::group(['prefix' => 'v1/payment'], function() {
    Route::post('/process', 'API\PaymentController@process');
});