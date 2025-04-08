import React from "react";
import { ShoppingCart } from "lucide-react";
import CartDropdown from "./CartDropdown";

const Header = ({ cart, setIsCartOpen, isCartOpen }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
        Магазин
      </h1>
      <CartDropdown
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        isCartOpen={isCartOpen}
      />
    </div>
  );
};

export default Header;
