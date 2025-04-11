import React from "react";
import { ShoppingCart, X } from "lucide-react";
import { Link } from "react-router-dom";

const CartDropdown = ({ cart, setCart, isCartOpen, setIsCartOpen }) => {
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const increase = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const decrease = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, count: item.count - 1 } : item
        )
        .filter((item) => item.count > 0)
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.count, 0);

  return (
    <div className="relative">
      <div
        className="cursor-pointer w-8 h-8 text-gray-600 hover:text-indigo-600"
        onClick={() => setIsCartOpen(!isCartOpen)}
      >
        <ShoppingCart className="w-8 h-8" />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cart.length}
          </span>
        )}
      </div>
      {isCartOpen && (
        <div className="absolute right-0 mt-2 w-110 p-4 bg-white border border-gray-200 rounded-lg shadow-md">
          <h3 className="font-bold mb-4">Количка</h3>
          {cart.length === 0 ? (
            <p className="text-gray-500">Количката е празна</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between mb-4">
                  <span>{item.name}</span>
                  <div className="flex items-center">
                    <button onClick={() => decrease(item.id)}>
                      {" "}
                      <span className="bg-gray-100 rounded-full text-sm font-medium text-gray-700 shadow">
                        -
                      </span>
                    </button>
                    <span className="mx-2">{item.count}</span>
                    <button onClick={() => increase(item.id)}>
                      <span className="bg-gray-100 rounded-full text-sm font-medium text-gray-700 shadow">
                        +
                      </span>
                    </button>
                  </div>
                  <span>{(item.price * item.count).toFixed(2)} лв</span>
                  <button onClick={() => removeItem(item.id)}>
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              ))}
              <div className="text-right font-bold mt-4">
                Общо: {total.toFixed(2)} лв
              </div>
              <Link
                to="/checkout"
                className="block bg-indigo-500 text-white text-center py-2 rounded-lg mt-4"
              >
                Завърши поръчката
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartDropdown;
