import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicApi } from "../utils/api";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const validationSchema = yup.object({
    title: yup.string().required("Product title is required"),
    description: yup.string().required("Product description is required"),
    price: yup
      .number()
      .required("Price is required")
      .positive("Price must be positive")
      .integer("Price must be an integer"),
    image: yup.mixed().required("Image is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      image: null,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("image", imageFile);

      const token = localStorage.getItem("auth");
      const role = localStorage.getItem("role");

      try {
        const { data } = await publicApi.post("/addequipment", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
            Role: role,
          },
        });

        toast.success("Product added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });

        resetForm();
        setImageFile(null);

        setTimeout(() => navigate("/products"), 3000);
      } catch (error) {
        console.error("Error adding product:", error);

        toast.error("Failed to add product. Please try again!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    },
  });

  return (
    <div className="relative w-screen h-full flex items-center bg-gradient-to-b from-gray-700 to-gray-950 justify-center overflow-hidden">
      <div className="z-10 max-w-5xl mx-auto p-8 bg-gradient-to-t from-gray-800 to-gray-950 hover:bg-gradient-to-r from-gray-920 to-gray-950 rounded-xl shadow-lg mt-32 mb-10 w-100">
        <ToastContainer />
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Add New Product
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {[
            { label: "Product Title", name: "title", type: "text" },
            { label: "Product Description", name: "description", type: "text" },
            { label: "Price", name: "price", type: "number" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-slate-300 font-medium">{label}</label>
              <input
                type={type}
                name={name}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400 w-full"
                onKeyPress={(e) => {
                  if (name === "price" && !/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
              {formik.touched[name] && formik.errors[name] && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors[name]}
                </div>
              )}
            </div>
          ))}

          <div>
            <label className="block text-slate-300 font-medium">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setImageFile(e.target.files[0]);
                formik.setFieldValue("image", e.target.files[0]);
              }}
              className="mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400 w-full"
            />
            {formik.touched.image && formik.errors.image && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.image}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="h-18 w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-md transition-all duration-300"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
