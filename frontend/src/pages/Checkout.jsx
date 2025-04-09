// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// function CheckoutPage() {
//   const [cart, setCart] = useState(
//     localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
//   );
//   const [total, setTotal] = useState(0);
//   const [formData, setFormData] = useState({
//     name: "",
//     address: "",
//     email: "",
//     paymentMethod: "credit_card",
//   });

//   useEffect(() => {
//     const storedCart = localStorage.getItem("cart");
//     if (storedCart) {
//       const parsedCart = JSON.parse(storedCart);
//       setCart(parsedCart);
//       const totalAmount = parsedCart.reduce(
//         (acc, item) => acc + item.price * item.count,
//         0
//       );
//       setTotal(totalAmount);
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const updateItemCount = (id, change) => {
//     setCart((prevCart) => {
//       let updatedCart = prevCart.map((item) =>
//         item.id === id
//           ? {
//               ...item,
//               count: item.count + change,
//             }
//           : item
//       );

//       updatedCart = updatedCart.filter((item) => item.count > 0);

//       const newTotal = updatedCart.reduce(
//         (acc, item) => acc + item.price * item.count,
//         0
//       );
//       setTotal(newTotal);

//       localStorage.setItem("cart", JSON.stringify(updatedCart));

//       return updatedCart;
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Поръчката е завършена!", formData, cart);

//     setCart([]);
//     localStorage.removeItem("cart");
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">
//         Завърши поръчката
//       </h1>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-semibold mb-4">Продукти в количката</h2>
//           <div className="space-y-4">
//             {cart.length > 0 ? (
//               cart.map((item, index) => (
//                 <div
//                   key={index}
//                   className="flex justify-between items-center border-b pb-4"
//                 >
//                   <div className="flex items-center space-x-4">
//                     <span className="text-lg font-semibold">{item.name}</span>
//                     <div className="flex items-center space-x-2">
//                       <button
//                         onClick={() => updateItemCount(item.id, -1)}
//                         className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full hover:bg-gray-300"
//                       >
//                         -
//                       </button>
//                       <span className="text-lg">{item.count}</span>
//                       <button
//                         onClick={() => updateItemCount(item.id, 1)}
//                         className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full hover:bg-gray-300"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>
//                   <span className="text-lg font-semibold">
//                     x {item.price} лв.
//                   </span>
//                 </div>
//               ))
//             ) : (
//               <p className="text-lg text-gray-500">
//                 Няма предмети в количката.
//               </p>
//             )}
//           </div>
//           {cart.length > 0 && (
//             <div className="mt-6 flex justify-between items-center font-semibold">
//               <span>Обща сума:</span>
//               <span>{total.toFixed(2)} лв.</span>
//             </div>
//           )}
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-semibold mb-4">Информация за плащане</h2>
//           <form
//             onSubmit={handleSubmit}
//             className="space-y-4"
//             disabled={cart.length === 0}
//           >
//             <div>
//               <label className="block font-semibold" htmlFor="name">
//                 Име
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block font-semibold" htmlFor="address">
//                 Адрес за доставка
//               </label>
//               <input
//                 type="text"
//                 id="address"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block font-semibold" htmlFor="email">
//                 Имейл адрес
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block font-semibold" htmlFor="phoneNumber">
//                 Телефонен номер
//               </label>
//               <input
//                 type="number"
//                 id="phoneNumber"
//                 name="phoneNumber"
//                 value={formData.phoneNumber}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg"
//                 required
//               />
//             </div>

//             <div className="flex justify-between items-center mt-6">
//               <Link to="/" className="text-indigo-500 hover:text-indigo-700">
//                 Обратно в магазина
//               </Link>
//               <button
//                 type="submit"
//                 className={`${
//                   cart.length === 0
//                     ? "bg-gray-300 cursor-not-allowed"
//                     : "bg-indigo-600 hover:bg-indigo-700"
//                 } text-white px-6 py-3 rounded-lg`}
//                 disabled={cart.length === 0}
//               >
//                 Завърши поръчката
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CheckoutPage;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cart from "../components/checkout/Cart";
import CheckoutForm from "../components/checkout/Form";

function CheckoutPage() {
  const [cart, setCart] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    paymentMethod: "credit_card",
  });

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCart(parsedCart);
      const totalAmount = parsedCart.reduce(
        (acc, item) => acc + item.price * item.count,
        0
      );
      setTotal(totalAmount);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const updateItemCount = (id, change) => {
    setCart((prevCart) => {
      let updatedCart = prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              count: item.count + change,
            }
          : item
      );

      updatedCart = updatedCart.filter((item) => item.count > 0);

      const newTotal = updatedCart.reduce(
        (acc, item) => acc + item.price * item.count,
        0
      );
      setTotal(newTotal);

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Поръчката е завършена!", formData, cart);

    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">
        Завърши поръчката
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Cart cart={cart} updateItemCount={updateItemCount} />
        <CheckoutForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cart={cart}
        />
      </div>
    </div>
  );
}

export default CheckoutPage;
