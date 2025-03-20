import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setIsAdmin(userRole === "admin");
  }, []);

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

      try {
        // Simulating API request
        console.log("Product added:", values);
        toast.success("Product added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });

        resetForm();
        setImageFile(null);
        setImagePreview(null);

        setTimeout(() => navigate("/products"), 3000);
      } catch (error) {
        toast.error("Failed to add product. Please try again!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    },
  });

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen font-my text-white">
        <p className="text-xl">You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center my-10 font-my justify-center min-h-screen p-6">
      <ToastContainer />
      <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Add New Product
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input Fields */}
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
                  className="mt-1 p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400 w-full"
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
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-slate-300 font-medium mb-2">
              Product Image
            </label>
            <div
              className="border-2 border-dashed border-gray-500 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700"
              onClick={() => document.getElementById("fileInput").click()}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Uploaded Preview"
                  className="w-full max-h-40 object-cover rounded-md"
                />
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-gray-400 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16V12a4 4 0 118 0v4m-6 0a2 2 0 104 0m-6 0h4m-2-9a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <p className="text-gray-400">Click to upload or drag & drop</p>
                </>
              )}
            </div>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImageFile(file);
                  setImagePreview(URL.createObjectURL(file));
                  formik.setFieldValue("image", file);
                }
              }}
            />
            {formik.touched.image && formik.errors.image && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.image}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-md transition-all duration-300"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;













// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { publicApi } from "../utils/api";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AddProduct = () => {
//   const [imageFile, setImageFile] = useState(null);
//   const navigate = useNavigate();
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//        const checkAdminStatus = () => {
//         // Implement your logic to check if the user is an admin
//         // For example, you might check a user role from context or local storage
//         const userRole = localStorage.getItem('role'); // Example
        
//         setIsAdmin(userRole === 'admin');
//       };
      
//       checkAdminStatus();
//     }, []);

//   const validationSchema = yup.object({
//     title: yup.string().required("Product title is required"),
//     description: yup.string().required("Product description is required"),
//     price: yup
//       .number()
//       .required("Price is required")
//       .positive("Price must be positive")
//       .integer("Price must be an integer"),
//     image: yup.mixed().required("Image is required"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       title: "",
//       description: "",
//       price: "",
//       image: null,
//     },
//     validationSchema,
//     onSubmit: async (values, { resetForm }) => {
//       const formData = new FormData();
//       formData.append("title", values.title);
//       formData.append("description", values.description);
//       formData.append("price", values.price);
//       formData.append("image", imageFile);

//       const token = localStorage.getItem("auth");
//       const role = localStorage.getItem("role");

//       try {
//         const { data } = await publicApi.post("/addequipment", formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//             Role: role,
//           },
//         });

//         toast.success("Product added successfully!", {
//           position: "top-right",
//           autoClose: 3000,
//         });

//         resetForm();
//         setImageFile(null);

//         setTimeout(() => navigate("/products"), 3000);
//       } catch (error) {
//         console.error("Error adding product:", error);

//         toast.error("Failed to add product. Please try again!", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//       }
//     },
//   });

//   if (!isAdmin) {
//     return (
//       <div className="p-12 mt-20">
//         <div>You do not have permission to view this page.</div>

//       </div>
//     ); // Message for non-admin users

//   }
//   return (
//     <div className="relative w-screen h-full flex items-center bg-gradient-to-b from-gray-700 to-gray-950 justify-center overflow-hidden">
//       <div className="z-10 max-w-5xl mx-auto p-8 bg-gradient-to-t from-gray-800 to-gray-950 hover:bg-gradient-to-r from-gray-920 to-gray-950 rounded-xl shadow-lg mt-32 mb-10 w-100">
//         <ToastContainer />
//         <h2 className="text-2xl font-semibold text-center text-white mb-6">
//           Add New Product
//         </h2>
//         <form onSubmit={formik.handleSubmit} className="space-y-4">
//           {[
//             { label: "Product Title", name: "title", type: "text" },
//             { label: "Product Description", name: "description", type: "text" },
//             { label: "Price", name: "price", type: "number" },
//           ].map(({ label, name, type }) => (
//             <div key={name}>
//               <label className="block text-slate-300 font-medium">{label}</label>
//               <input
//                 type={type}
//                 name={name}
//                 value={formik.values[name]}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className="mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400 w-full"
//                 onKeyPress={(e) => {
//                   if (name === "price" && !/[0-9]/.test(e.key)) {
//                     e.preventDefault();
//                   }
//                 }}
//               />
//               {formik.touched[name] && formik.errors[name] && (
//                 <div className="text-red-500 text-sm mt-1">
//                   {formik.errors[name]}
//                 </div>
//               )}
//             </div>
//           ))}

//           <div>
//             <label className="block text-slate-300 font-medium">
//               Product Image
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => {
//                 setImageFile(e.target.files[0]);
//                 formik.setFieldValue("image", e.target.files[0]);
//               }}
//               className="mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400 w-full"
//             />
//             {formik.touched.image && formik.errors.image && (
//               <div className="text-red-500 text-sm mt-1">
//                 {formik.errors.image}
//               </div>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="h-18 w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-md transition-all duration-300"
//           >
//             Add Product
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;
