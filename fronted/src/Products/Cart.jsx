// import React,{ useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Cart = () => {
//   const [cart, setCart] = useState(() => {
//     return JSON.parse(localStorage.getItem("cart")) || [];
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   const removeFromCart = (id) => {
//     setCart(cart.filter((item) => item.id !== id));
//   };

//   return (
//     <div className="container mx-auto mt-5">
//       <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
//       {cart.length === 0 ? (
//         <p>No items in the cart.</p>
//       ) : (
//         cart.map((product) => (
//           <div key={product.id} className="border p-4 rounded shadow-md mb-4">
//             <img src={product.imgSrc} alt={product.title} className="w-24 h-24 object-cover" />
//             <h3 className="text-lg font-bold">{product.title}</h3>
//             <p>Quantity: {product.quantity}</p>
//             <p className="font-semibold">INR {product.price * product.quantity}</p>
//             <button
//               className="bg-red-500 text-white px-3 py-1 rounded mt-2"
//               onClick={() => removeFromCart(product.id)}
//             >
//               Remove
//             </button>
//           </div>
//         ))
//       )}
//       {cart.length > 0 && (
//         <button
//           className="bg-yellow-500 text-black font-bold w-full py-2 rounded mt-4"
//           onClick={() => navigate("/order-details")}
//         >
//           Buy Now
//         </button>
//       )}
//     </div>
//   );
// };

// export default Cart;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        cart.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow-md mb-4">
            <img src={product.imgSrc} alt={product.title} className="w-24 h-24 object-cover" />
            <h3 className="text-lg font-bold">{product.title}</h3>
            <p>Quantity: {product.quantity}</p>
            <p className="font-semibold">INR {product.price * product.quantity}</p>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded mt-2"
              onClick={() => removeFromCart(product.id)}
            >
              Remove
            </button>
          </div>
        ))
      )}
      {cart.length > 0 && (
        <button
          className="bg-yellow-500 text-black font-bold w-full py-2 rounded mt-4"
          onClick={() => navigate("/order-details")} // Redirect to Order Details Page
        >
          Buy Now
        </button>
      )}
    </div>
  );
};

export default Cart;