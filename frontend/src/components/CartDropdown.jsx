import React from "react";
import { ShoppingCart, X } from "lucide-react";

const CartDropdown = ({ cart, setIsCartOpen, isCartOpen }) => {
  const removeItemFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setIsCartOpen(updatedCart);
  };

  return (
    <div className="relative">
      <div
        className="cursor-pointer w-8 h-8 text-gray-600 hover:text-indigo-600 transition-colors"
        onClick={() => setIsCartOpen(!isCartOpen)}
      >
        <ShoppingCart className="w-8 h-8" />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-md">
            {cart.length}
          </span>
        )}
      </div>

      {isCartOpen && (
        <div className="absolute right-0 mt-2 w-64 p-4 bg-white border border-gray-200 rounded-lg shadow-md">
          <h3 className="font-bold text-gray-800 mb-4">Количка</h3>
          {cart.length <= 2 ? (
            <div>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between mb-2"
                >
                  <span className="text-gray-800">{item.name}</span>
                  <button
                    className="text-red-500"
                    onClick={() => removeItemFromCart(item.id)}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p className="text-gray-500 mb-2">
                Имате повече от 2 продукта в количката.
              </p>
              <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg mt-2">
                Отиди в количката
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartDropdown;
