import React from "react";
import { ShoppingCart, X } from "lucide-react";
import { Link } from "react-router-dom";

const CartDropdown = ({ cart, setCart, isCartOpen, setIsCartOpen }) => {
  const removeItemFromCart = (productId) => {
    const updatedCart = JSON.parse(localStorage.getItem(cart)).filter(
      (item) => item.id !== productId
    );
    setCart(updatedCart);
  };

  const increaseItemCount = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        return { ...item, count: item.count + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const decreaseItemCount = (productId) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === productId) {
          const newCount = item.count - 1;
          if (newCount === 0) {
            return null;
          }
          return { ...item, count: newCount };
        }
        return item;
      })
      .filter((item) => item !== null);

    setCart(updatedCart);
  };

  const calculateTotal = () => {
    const total = cart.reduce(
      (total, item) => total + item.price * item.count,
      0
    );
    return total.toFixed(2);
  };

  const saveCartToLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
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
        <div className="absolute right-0 mt-2 w-110 p-4 bg-white border border-gray-200 rounded-lg shadow-md">
          <h3 className="font-bold text-gray-800 mb-4">Количка</h3>

          {cart.length === 0 ? (
            <div className="flex items-center justify-center h-24">
              <p className="text-gray-500">Количката е празна</p>
            </div>
          ) : (
            <div>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between mb-4 border-b pb-4"
                >
                  <div className="flex items-center w-full justify-between">
                    <span className="text-gray-800">{item.name}</span>
                    <div className="flex items-center">
                      <button
                        onClick={() => decreaseItemCount(item.id)}
                        className="px-2 py-1 text-sm bg-gray-200 rounded-full"
                      >
                        -
                      </button>
                      <span className="mx-2 text-gray-600">{item.count}</span>
                      <button
                        onClick={() => increaseItemCount(item.id)}
                        className="px-2 py-1 text-sm bg-gray-200 rounded-full"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-gray-700">
                      <strong>
                        {(item.price * item.count).toFixed(2)} лв{" "}
                      </strong>
                    </span>
                  </div>
                  <button
                    className="text-red-500"
                    onClick={() => removeItemFromCart(item.id)}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <div className="mt-4 text-right">
                <span className="text-lg font-semibold">Общо: </span>
                <span className=" font-bold">{calculateTotal()} лв</span>
              </div>

              <div className="mt-6">
                <Link
                  to="/checkout"
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg"
                  onClick={() => saveCartToLocalStorage()}
                >
                  Завърши поръчката
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartDropdown;
