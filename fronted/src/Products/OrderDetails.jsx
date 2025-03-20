import React,{ useState, useEffect } from "react";

const OrderDetails = () => {
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    paymentMethod: "cash", // Default payment method
  });

  useEffect(() => {
    // Fetch cart data from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (!formData.name || !formData.email || !formData.address || !formData.phone) {
      alert("Please fill all required fields!");
      return;
    }

    const orderData = {
      ...formData,
      orderItems: cart,
      totalAmount: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    };

    // Store the order in localStorage (you can replace this with an API call)
    localStorage.setItem("orderDetails", JSON.stringify(orderData));
    
    alert("🎉 Order Placed Successfully!");
    
    // Optionally clear cart after order
    localStorage.removeItem("cart");
    setCart([]);
  };

  return (
    <div className="container mx-auto p-5 max-w-4xl">
      <h2 className="text-3xl font-bold mb-5 text-center">🛒 Order Summary</h2>

      {/* Product List */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-5">
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">No items in your cart.</p>
        ) : (
          cart.map((product) => (
            <div key={product.id} className="flex items-center justify-between border-b pb-3 mb-3">
              <img src={product.imgSrc} alt={product.title} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1 ml-3">
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-sm text-gray-600">Qty: {product.quantity}</p>
              </div>
              <p className="text-lg font-bold">INR {product.price * product.quantity}</p>
            </div>
          ))
        )}
        {/* Total Amount */}
        {cart.length > 0 && (
          <div className="text-xl font-bold text-right mt-3">
            Total: INR {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
          </div>
        )}
      </div>

      {/* User Details Form */}
      <h3 className="text-xl font-bold mb-3">📝 Your Details</h3>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        className="border p-2 w-full mb-3 rounded"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="border p-2 w-full mb-3 rounded"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Delivery Address"
        className="border p-2 w-full mb-3 rounded"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        className="border p-2 w-full mb-3 rounded"
        onChange={handleChange}
        required
      />

      {/* Payment Method Selection */}
      <h3 className="text-xl font-bold mb-2">💰 Payment Method</h3>
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="paymentMethod"
            value="cash"
            checked={formData.paymentMethod === "cash"}
            onChange={handleChange}
          />
          Cash on Delivery
        </label>
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
      </div>

      {/* Place Order Button */}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded w-full mt-5 font-bold"
        onClick={handlePlaceOrder}
      >
        ✅ Place Order
      </button>
    </div>
  );
};

export default OrderDetails;