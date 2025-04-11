<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Order\StoreOrderRequest;
use App\Http\Requests\Api\Order\UpdateOrderRequest;
use App\Models\Order;

class OrderController extends Controller
{
    /**
     * List all orders
     */
    public function index()
    {
        return response()->json(Order::all());
    }

    /**
     * Store a newly created order.
     */
    public function store(StoreOrderRequest $request)
    {
        $order = Order::create($request->validated());

        return response()->json([
            'message' => 'Поръчката е съхранена успешно!',
            'order' => $order,
        ], 201);
    }

    /**
     * Show a specific order by ID.
     */
    public function show(Order $order)
    {
        return response()->json($order);
    }

    /**
     * Update an order.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        $validated = $request->validated();

        $order->update($validated);

        return response()->json([
            'message' => 'Поръчката е обновена успешно!',
            'order' => $order,
        ]);
    }

    /**
     * Delete an order.
     */
    public function destroy(Order $order)
    {
        $order->delete();

        return response()->json([
            'message' => 'Поръчката е изтрита успешно.',
        ]);
    }
}
