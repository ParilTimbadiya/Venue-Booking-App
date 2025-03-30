import React, { useState, useEffect } from "react";
import { publicApi } from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const OrderDetails = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    // email: "",
    phone: "",
    address: "",
    paymentMethod: "online",
    upiId: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    // if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (formData.paymentMethod === "online" && !formData.upiId.trim()) {
      newErrors.upiId = "UPI ID is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handlePlaceOrder = async () => {

    if (!validateForm()) return;

    const orderData = {
      ...formData,
      orderItems: cart,
      totalAmount: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    };

    try {
      console.log(orderData)
        const response = await publicApi.post("/place-order", orderData); // Adjust the endpoint as necessary
        if (response.status === 200) {
            // toast.success("🎉 Order Placed Successfully!");
            localStorage.removeItem("cart");
            setCart([]);
            navigate('/');
        } else {
            alert("Failed to place order. Please try again.");
        }
    } catch (error) {
        console.error("Error placing order:", error);
        alert("An error occurred while placing the order. Please try again.");
    }

  };

  return (
    <div className="container bg-[#0c131a] font-my mx-auto p-5 max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Customer Information */}
      <div className="bg-[#1e293b] text-gray-300 p-6 shadow-lg rounded-lg col-span-2">
        <h2 className="text-3xl font-bold mb-4">Customer Information</h2>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className="border p-2 w-full mb-2 rounded bg-[#0c131a] text-white"
          onChange={handleChange}
        />
        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
        
        {/* <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 w-full mb-2 rounded"
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>} */}

        <input
          type="number"
          name="phone"
          placeholder="Mobile Number"
          className="border p-2 w-full mb-2 rounded bg-[#0c131a] text-white"
          onChange={handleChange}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

        <textarea
          name="address"
          placeholder="Delivery Address"
          className="border p-2 w-full mb-2 rounded bg-[#0c131a] text-white"
          rows="3"
          onChange={handleChange}
        ></textarea>
        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}

        {/* Payment Method */}
        <h3 className="text-xl font-bold mt-3">Payment Method</h3>
        <div className="flex gap-4 mt-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              value="online"
              checked={formData.paymentMethod === "online"}
              onChange={handleChange}
            />
            Online Payment
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={formData.paymentMethod === "cod"}
              onChange={handleChange}
            />
            Cash on Delivery
          </label>
        </div>

        {formData.paymentMethod === "online" && (
          <div className="mt-3">
            <input
              type="email"
              name="upiId"
              placeholder="example@upi"
              className="border p-2 w-full rounded bg-[#0c131a] text-white"
              onChange={handleChange}
            />
            {errors.upiId && (
              <p className="text-red-500 text-sm">{errors.upiId}</p>
            )}
          </div>
        )}

        <button
          className="bg-green-500 text-white px-4 py-2 rounded w-full mt-5 font-bold hover:bg-green-600"
          onClick={handlePlaceOrder}
        >
          Confirm Order ₹{cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
        </button>
      </div>

      {/* Order Summary */}
      <div className="bg-[#1e293b] text-gray-300 p-6 shadow-lg rounded-lg lg:w-[400px] ">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">No items in your cart.</p>
        ) : (
          <div>
            {cart.map((product) => (
              <div key={product.id} className="flex items-center justify-between border-b pb-3 mb-3">
                <div className="">
                  <img src={product.imgSrc} alt={product.title} className="w-20 h-20 object-cover rounded" />
                </div>
                <div className="ml-3 flex-1 text-right">
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <p className="text-sm text-gray-600">Qty: {product.quantity}</p>
                  <p className="text-lg font-bold">₹{(product.price * product.quantity).toFixed(2)}</p>
                </div>
                {/* <p className="text-lg font-bold">₹{(product.price * product.quantity).toFixed(2)}</p> */}
              </div>
            ))}
            <div className="text-xl font-bold text-right mt-3 border-t pt-3 text-[#6eb4ef]">
              Total: ₹{cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
