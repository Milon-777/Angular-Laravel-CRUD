<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Article;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\UserController;
use App\Http\Resources\ArticleResource;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::get('/articles', function () {
//     // return ArticleResource::collection(Article::all());
// });

// Route::get('/article/{id}', function ($id) {
//     return new ArticleResource(Article::findOrFail($id));
// });

Route::get('/articles', [ArticleController::class, 'index']);

Route::get('/articles/{id}', [ArticleController::class, 'show']);

Route::post('/articles', [ArticleController::class, 'store']);

Route::put('/articles/{id}', [ArticleController::class, 'update']);

Route::delete('/articles/{id}', [ArticleController::class, 'destroy']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware'=>'auth:sanctum'], function () {
    // Route::get('/users', 'GetController')
});

// Route::get('/get', 'GetController');
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);