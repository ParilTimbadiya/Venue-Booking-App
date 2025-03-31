import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { publicApi } from "../utils/api";

const Cart = () => {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const navigate = useNavigate();
  const handleQr = () =>{
    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    console.log(totalAmount);
        const fetchQRCode = async () => {
          try {
            const response = await publicApi.post("/generate-qr",{ amount: totalAmount }); // Adjust the endpoint as necessary
            if (response.status === 200) {
              console.log(response.data.qrCodeUrl);
              
              setQrCodeUrl(response.data.qrCodeUrl); // Assuming the QR code URL is returned in this format
            }
          } catch (error) {
            console.error("Error fetching QR code:", error);
            setQrCodeUrl("");
          }
        };
    
        fetchQRCode();
        navigate("/order-details")
  };
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
    <div className="min-h-screen bg-[#0c131a] flex justify-center py-10 mx-6 px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Product List Section */}
        <div className="lg:col-span-2 ">
          <h2 className="text-3xl text-gray-300 font-semibold mb-6">🛒 Shopping Bag</h2>
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-[#1e293b] p-6 rounded-lg shadow-md">
              <p className="text-gray-600 text-lg">Your cart is empty.</p>
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-md mt-4 hover:bg-blue-700 transition"
                onClick={() => navigate("/products")}
              >
                🛍 Continue Shopping
              </button>
            </div>
          ) : (
            <div className=" rounded-lg bg-[#1e293b] shadow-md p-6">
              {cart.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center text-gray-300 justify-between border-b py-4 last:border-none"
                >
                  <div className="flex items-center gap-4">
                    <img src={product.imgSrc} alt={product.title} className="w-20 h-20 object-cover rounded-lg" />
                    <div>
                      <h3 className="text-2xl font-bold">{product.title}</h3>
                      <p className="text-gray-500 font-semibold">₹{product.price} x {product.quantity}</p>
                    </div>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-lg px-2">
                      <button 
                        className="px-2 py-1 text-lg hover:text-blue-500 transition"
                        onClick={() => updateQuantity(product.id, -1)}
                      >➖</button>
                      <span className="px-3 font-bold ">{product.quantity}</span>
                      <button 
                        className="px-2 py-1 text-lg hover:text-blue-500 transition"
                        onClick={() => updateQuantity(product.id, 1)}
                      >➕</button>
                    </div>
                    <p className="font-bold text-lg text-[#6eb4ef]">₹{product.price * product.quantity}</p>
                    <button
                      className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
                      onClick={() => removeFromCart(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary Section */}
        {cart.length > 0 && (
          <div className="text-gray-300 bg-[#1e293b] rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-semibold mb-4">📝 Order Summary</h3>
            
            <div className="flex justify-between ">
              <p>Subtotal</p>
              <p className="font-semibold">₹{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</p>
            </div>

            <div className="mt-4">
              <label className=" font-medium block">Coupon Code</label>
              <input
                type="text"
                placeholder="Enter code"
                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300 bg-[#0c131a] text-white"
              />
              <button className="w-full mt-2 bg-black text-white py-2 rounded-md hover:opacity-80">
                Apply
              </button>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-bold text-lg text-[#6eb4ef]">
              <p>Total</p>
              <p>₹ {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</p>
            </div>

            <button
              className="px-[16px] py-[11px] border-[1px] border-[#6eb5ef40] bg-[#6eb4ef14] rounded-md text-[#6eb4ef] w-full my-3 cursor-pointer font-medium"
              onClick={() => handleQr()}
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