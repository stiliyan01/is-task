import React from "react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

const Cart = ({ cart, setCart }) => {
  const updateItemCount = (id, change) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, count: item.count + change } : item
      )
      .filter((item) => item.count > 0);

    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

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
          <p className="text-lg text-gray-500">Няма продукти в количката.</p>
        )}
      </div>
      {cart.length > 0 && <CartSummary cart={cart} />}
    </div>
  );
};

export default Cart;
