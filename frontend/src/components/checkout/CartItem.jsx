import React from "react";

const CartItem = ({ item, updateItemCount }) => {
  return (
    <div className="flex justify-between items-center border-b pb-4">
      <div className="flex items-center space-x-4">
        <span className="text-lg font-semibold">{item.name}</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => updateItemCount(item.id, -1)}
            className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full hover:bg-gray-300"
          >
            -
          </button>
          <span className="text-lg">{item.count}</span>
          <button
            onClick={() => updateItemCount(item.id, 1)}
            className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full hover:bg-gray-300"
          >
            +
          </button>
        </div>
      </div>
      <span className="text-lg font-semibold">x {item.price} лв.</span>
    </div>
  );
};

export default CartItem;
