<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Traits\Callbacks;

abstract class CrudController extends Controller
{
  use Callbacks;

  protected $model;
  protected $request;

  public function index()
  {
    $klass = $this->model;

    $baseQuery = $klass::query();

    $this->callback('applyFilters', $this->request, $baseQuery);

    $dataQuery = clone $baseQuery;

    return response()->json($dataQuery->get(), 200);
  }

  public function show($id)
  {
    return response()->json($this->model::find($id), 200);
  }

  public function store()
  {
    try {
      $this->request->validate($this->getValidationRules());
    } catch (ValidationException $e) {
      return response($e->errors(), 400);
    }

    $model = $this->model::create($this->request->all());

    return response()->json($model, 201);
  }

  public function update($id)
  {
    $this->validate($this->request, $this->getValidationRules());

    $model = $this->model::findOrFail($id);
    $model->update($this->request->all());

    return response()->json($model, 200);
  }

  public function destroy($id)
  {
    $this->model::findOrFail($id)->delete();
    return response()->json(['message' => 'Deleted Successfully'], 200);
  }

  public function validateInput()
  {
    try {
      $this->request->validate($this->getValidationRules());
    } catch (ValidationException $e) {
      return response($e->errors(), 400);
    }
  }
}