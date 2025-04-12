<?php

namespace App\Http\Requests\Api\Order;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => 'nullable|exists:users,id',
            'name'     => 'required|string|max:255',
            'email'    => 'required|email',
            'phone'    => 'required|string|max:20',
            'address'  => 'required|string|max:500',
            'products' => 'required|array|min:1',
            'products.*.id'    => 'required|integer',
            'products.*.name'  => 'required|string',
            'products.*.quantity'   => 'required|integer|min:1',
            'products.*.price' => 'required|numeric|min:0',
            'total'    => 'required|numeric|min:0',
        ];
    }
}
