import React from "react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

const Cart = ({ cart, updateItemCount }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Продукти в количката</h2>
      <div className="space-y-4">
        {cart.length > 0 ? (
          cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              updateItemCount={updateItemCount}
            />
          ))
        ) : (
          <p className="text-lg text-gray-500">Няма предмети в количката.</p>
        )}
      </div>
      {cart.length > 0 && <CartSummary />}
    </div>
  );
};

export default Cart;
