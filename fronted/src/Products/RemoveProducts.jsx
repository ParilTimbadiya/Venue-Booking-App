import React, { useEffect, useState } from "react";
import { publicApi } from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RemoveProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await publicApi.get("/productlist");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products.");
      }
    };
    fetchProducts();
  }, []);

  const handleRemove = async (id) => {
    try {
      const response = await publicApi.post(`/removeProduct`,{productId: id});
      if (response.status === 200) {
        toast.success("Product removed successfully!");
        setProducts(products.filter(product => product.id !== id)); // Update the state to remove the product
      }
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error("Failed to remove product.");
    }
  };

  return (
    <div className="flex items-center my-10 font-my justify-center min-h-screen p-6">
      <ToastContainer />
      <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Remove Products
        </h2>
        <div className="space-y-4">
          {products.length === 0 ? (
            <p className="text-white">No products available.</p>
          ) : (
            products.map(product => (
              <div key={product.id} className="flex justify-between items-center bg-gray-700 p-4 rounded-md">
                <div>
                <img
                src={product.imgSrc}
                alt={product.title}
                className="w-16 h-16 object-cover rounded-lg border"
                ></img>
                  <h3 className="text-xl text-white">{product.title}</h3>
                  <p className="text-gray-300">Price: ${product.price}</p>
                </div>
                <button
                  onClick={() => handleRemove(product.id)}
                  className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md transition-all duration-300"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RemoveProducts;
