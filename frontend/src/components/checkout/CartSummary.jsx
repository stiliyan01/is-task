import React from "react";

const CartSummary = () => {
  const total = JSON.parse(localStorage.getItem("cart")).reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  return (
    <div className="mt-6 flex justify-between items-center font-semibold">
      <span>Обща сума:</span>
      <span>{total.toFixed(2)} лв.</span>
    </div>
  );
};

export default CartSummary;
