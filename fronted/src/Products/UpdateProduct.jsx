import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { publicApi } from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProduct = () => {
  const [product, setProduct] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    imgSrc: "",
  });
  const navigate = useNavigate();
  // const { id } = useParams(); // Get product ID from URL

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const response = await publicApi.get(`/productfetch`,{productId:id});
  //       setProduct(response.data);
  //     } catch (error) {
  //       console.error("Error fetching product:", error);
  //       toast.error("Failed to fetch product details.");
  //     }
  //   };
  //   fetchProduct();
  // }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await publicApi.post(`/productfetch`, product);
      if (response.status === 200) {
        toast.success("Product updated successfully!");
        navigate("/products"); // Redirect to products page
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    }
  };

  return (
    <div className="flex items-center my-10 font-my justify-center min-h-screen p-6">
      <ToastContainer />
      <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Update Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium">Product ID</label>
              <input
                type="text"
                name="productId"
                value={product.id}
                onChange={handleChange}
                className="mt-1 p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={product.title}
                onChange={handleChange}
                className="mt-1 p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium">Description</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                className="mt-1 p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium">Price</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="mt-1 p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400 w-full"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-md transition-all duration-300"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
