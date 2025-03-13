import { useState, useEffect } from "react";
import { publicApi } from "../utils/api"; // Importing the publicApi for fetching data
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Product.css"; // Adding custom CSS
import React from "react";

const Product = () => {
  const [items, setItems] = useState([]); // State to hold fetched items
  const [cart, setCart] = useState([]); // State to hold cart items

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
    setCart((prevCart) => [...prevCart, product]);
    toast.success(`${product.title} added to cart!`);
  };

  const handleRemoveFromCart = (product) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
    toast.error(`${product.title} removed from cart!`);
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
                  {cart.some((cartItem) => cartItem.id === product.id) ? (
                    <button onClick={() => handleRemoveFromCart(product)} className="product-cart-btn">Remove from Cart</button>
                  ) : (
                    <button onClick={() => handleAddToCart(product)} className="product-cart-btn">Add to Cart</button>
                  )}
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
