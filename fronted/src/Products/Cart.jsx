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
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map((item) => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Product List Section */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-semibold mb-6">🛒 Shopping Bag</h2>
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 text-lg">Your cart is empty.</p>
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-md mt-4 hover:bg-blue-700 transition"
                onClick={() => navigate("/products")}
              >
                🛍 Continue Shopping
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6">
              {cart.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between border-b py-4 last:border-none"
                >
                  <div className="flex items-center gap-4">
                    <img src={product.imgSrc} alt={product.title} className="w-20 h-20 object-cover rounded-lg" />
                    <div>
                      <h3 className="text-lg font-semibold">{product.title}</h3>
                      <p className="text-gray-500">₹{product.price} x {product.quantity}</p>
                    </div>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-lg px-2">
                      <button 
                        className="px-2 py-1 text-lg hover:text-blue-500 transition"
                        onClick={() => updateQuantity(product.id, -1)}
                      >➖</button>
                      <span className="px-3">{product.quantity}</span>
                      <button 
                        className="px-2 py-1 text-lg hover:text-blue-500 transition"
                        onClick={() => updateQuantity(product.id, 1)}
                      >➕</button>
                    </div>
                    <p className="font-bold text-lg text-blue-600">₹{product.price * product.quantity}</p>
                    <button
                      className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
                      onClick={() => removeFromCart(product.id)}
                    >
                      ❌
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary Section */}
        {cart.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-semibold mb-4">📝 Order Summary</h3>
            
            <div className="flex justify-between text-gray-700">
              <p>Subtotal</p>
              <p className="font-semibold">₹{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</p>
            </div>

            <div className="mt-4">
              <label className="text-gray-700 font-medium block">Coupon Code</label>
              <input
                type="text"
                placeholder="Enter code"
                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
              <button className="w-full mt-2 bg-black text-white py-2 rounded-md hover:opacity-80">
                Apply
              </button>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-bold text-lg">
              <p>Total</p>
              <p>₹ {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</p>
            </div>

            <button
              className="w-full mt-4 bg-yellow-500 text-black font-bold py-3 rounded-md shadow-md hover:bg-yellow-600 transition"
              onClick={() => navigate("/order-details")}
            >
              🛒 Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;