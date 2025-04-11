import React from "react";
import CartDropdown from "./CartDropdown";

const Header = ({ cart, setCart, isCartOpen, setIsCartOpen }) => (
  <div className="flex justify-between items-center mb-8">
    <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
      Магазин
    </h1>
    <CartDropdown
      cart={cart}
      setCart={setCart}
      isCartOpen={isCartOpen}
      setIsCartOpen={setIsCartOpen}
    />
  </div>
);

export default Header;
