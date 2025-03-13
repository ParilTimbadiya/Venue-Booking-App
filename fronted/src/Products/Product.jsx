import { useState, useEffect } from "react";
import { publicApi } from "../utils/api"; // Importing the publicApi for fetching data
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Product.css"; // Adding custom CSS
import React from "react";

const Product = () => {
  const [items, setItems] = useState([]); // State to hold fetched items
  const [cart, setCart] = useState([]); // State to hold cart items
  const [quantities, setQuantities] = useState({}); // State to hold quantities for each product
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await publicApi.get("/productlist");

        if (response && response.data) {
          setItems(response.data);
        } else {
          setItems([]);
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error fetching products:", error.response);
        setItems([]);
      }
    };

    fetchProducts(); // Call the fetch function
  }, []); // Empty dependency array to run once on mount

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 0; // Get current quantity or default to 0
    if (!isLoggedIn) {
      alert("Please log in to add items to your cart."); // Alert if not logged in
      return;
    }
    if (quantity > 0) {
      const existingProduct = cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += quantity; // Update quantity if already in cart
        setCart([...cart]);
      } else {
        setCart([...cart, { ...product, quantity }]); // Add new product with quantity
      }
      toast.success(`${product.title} added to cart!`);
    }
  };

  const handleRemoveFromCart = (product) => {
    setCart(cart.filter(item => item.id !== product.id));
    toast.error(`${product.title} removed from cart!`);
  };

const handleQuantityChange = (productId, change) => {
  if (change > 0 && !isLoggedIn) {
    alert("Please log in to increase the quantity."); // Alert if not logged in
    return;
  }
  setQuantities(prevQuantities => ({
    ...prevQuantities,
    [productId]: Math.max(0, (prevQuantities[productId] || 0) + change) // Prevent negative quantities
  }));
};


  return (
    <div className="container mt-5">
      <div className="product-grid">
        {items.length === 0 ? (
          <div key="no-products" className="no-products">
            <h2>No Products Found</h2>
            <p>
              We could not find any products matching your search. Try different
              keywords or check back later!
            </p>
          </div>
        ) : (
          items.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img src={product.imgSrc} alt={product.title} className="product-image" />
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-price-container">
                  <span className="product-price">${product.price}</span>
                  <div>
                    <button onClick={() => handleQuantityChange(product.id, 1)}>+</button>
                    <span>{quantities[product.id] || 0}</span> {/* Display current quantity */}
                    <button onClick={() => handleQuantityChange(product.id, -1)}>-</button>
                  </div>
                  <button onClick={() => handleAddToCart(product)} className="product-cart-btn">Add to Cart</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};





export default Product;
