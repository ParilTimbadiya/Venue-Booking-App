import React, { useState, useEffect } from "react";
import { publicApi } from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await publicApi.get("/productlist");
        console.log("API Response:", response.data); // Log the response to inspect its structure

        // Check if response.data is an array before setting items
        setItems(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setItems([]);
      }
    };
    fetchProducts();
    setIsLoggedIn(!!localStorage.getItem("auth") && !!localStorage.getItem("role"));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    if (!isLoggedIn) {
      toast.error("Please log in to add items to the cart.");
      return;
    }

    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]); // Default quantity set to 1
    }
    toast.success("Added to cart!");
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <button
          className="fixed top-28 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all"
          onClick={() => navigate("/cart")}
        >
          🛒 Cart ({cart.length})
        </button>
      )}

      {/* Product List */}
      {Array.isArray(items) && items.length > 0 ? (  // Added runtime check
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-lg shadow-lg p-4 hover:shadow-xl transition-all"
            >
              <img
                src={product.imgSrc}
                alt={product.title}
                className="w-full h-56 object-cover rounded-md"
              />
              <h3 className="text-lg font-bold mt-3">{product.title}</h3>
              <p className="text-gray-500 text-sm">{product.description}</p>
              <p className="text-xl font-semibold text-blue-600 mt-1">₹ {product.price}</p>

              <button
                className="bg-green-500 text-white w-full mt-3 py-2 rounded-md hover:bg-green-600 transition-all"
                onClick={() => addToCart(product)}
              >
                🛍 Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <h2 className="text-xl font-semibold">No Products Found</h2>
          <p>Try searching for something else or check back later.</p>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Product;
















// import { useState, useEffect } from "react";
// import { privateApi, publicApi } from "../utils/api"; // Importing the publicApi for fetching data
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./Product.css"; // Adding custom CSS
// import React from "react";

// const Product = () => {
//   const [items, setItems] = useState([]); // State to hold fetched items
//   const [cart, setCart] = useState([]); // State to hold cart items
//   const [quantities, setQuantities] = useState({}); // State to hold quantities for each product
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

//   useEffect(() => {
// const fetchProductsAndCart = async () => {
//   try {
//     const response = await Promise.all([
//       publicApi.get("/productlist"),
//       publicApi.get("/cart/items")
//     ]);
//     const products = response[0].data;
//     const cartItems = response[1].data;


//     if (products) {
//       setItems(products);
//       const newQuantities = {};
//       if (Array.isArray(cartItems)) {
//         cartItems.forEach(item => {
//           newQuantities[item.product.id] = item.qty; // Assuming the response has productId and quantity
//         });
//       }
//       setQuantities(newQuantities); // Set quantities based on fetched cart items

//         } else {
//           setItems([]);
//           console.error("Invalid response format:", response);
//         }
//       } catch (error) {
//         console.error("Error fetching products:", error.response);
//         setItems([]);
//       }
//     };

//     // Check local storage for authentication
//     const auth = localStorage.getItem('auth');
//     const role = localStorage.getItem('role');
//     setIsLoggedIn(!!auth && !!role); // Set logged in status based on local storage

//     if (isLoggedIn) {
//       fetchCartItems(); // Fetch cart items if logged in
//     }

//     fetchProductsAndCart(); // Call the fetch function
//   }, [isLoggedIn]); // Run effect when isLoggedIn changes

//   const fetchCartItems = async () => {
//     try {
//       const response = await publicApi.get("/cart/items"); // Adjust the endpoint as necessary
//       const cartItems = response.data;
//       console.log(cartItems);
      
//       const newQuantities = {};
//       if (Array.isArray(cartItems)) {
//         cartItems.forEach(item => {
//           newQuantities[item.product] = item.qty; // Assuming the response has productId and quantity
//         });
//       } else {
//         console.error("Cart items response is not an array. Cart items:", cartItems);
//       }
//       setQuantities(newQuantities); // Set quantities based on fetched cart items
//     } catch (error) {
//       console.error("Error fetching cart items:", error);
//     }
//   };

//   const handleQuantityChange = async (productId, change) => {
//     if (change > 0 && !isLoggedIn) {
//       alert("Please log in to increase the quantity."); // Alert if not logged in
//       return;
//     }
//     setQuantities(prevQuantities => {
//       const newQuantities = {
//         ...prevQuantities,
//         [productId]: Math.max(0, (prevQuantities[productId] || 0) + change) // Prevent negative quantities
//       };
      
//       // Make API call to update the cart in the backend
//       if (isLoggedIn) {
//         publicApi.get(`/cart/update`, {
//           product: productId,
//           qty: newQuantities[productId],

//         }).catch(error => {
//           console.error("Error updating cart:", error);
//         });
//       }
      
//       return newQuantities;
//     });
//   };


//   return (
//     <div className="container mt-5">
//       <div className="product-grid">
//         {items.length === 0 ? (
//           <div key="no-products" className="no-products">
//             <h2>No Products Found</h2>
//             <p>
//               We could not find any products matching your search. Try different
//               keywords or check back later!
//             </p>
//           </div>
//         ) : (
//           items.map((product) => (<></>
//             // <div key={product.id} className="product-card">
//             //   <div className="product-image-container">
//             //     <img
//             //       src={product.imgSrc}
//             //       alt={product.title}
//             //       className="product-image"
//             //     />
//             //   </div>
//             //   <div className="product-info">
//             //     <h3 className="product-title">{product.title}</h3>
//             //     <p className="product-description">{product.description}</p>
//             //     <div className="product-price-container">
//             //       <span className="product-price">${product.price}</span>
//             //       <div className="text-3xl p-">
//             //         <button
//             //           className="text-blue-700 p-3 border-1 rounded-xl"
//             //           onClick={() => handleQuantityChange(product.id, 1)}
//             //         >
//             //           +
//             //         </button>
//             //         <span className="p-3 text-black">
//             //           {quantities[product.id] || 0}
//             //         </span>{" "}
//             //         <button
//             //           className="text-blue-700 p-3 border-1 rounded-xl"
//             //           onClick={() => handleQuantityChange(product.id, -1)}
//             //         >
//             //           -
//             //         </button>
//             //       </div>
//             //     </div>
//             //   </div>
//             // </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Product;
