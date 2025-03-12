import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { privateApi } from "../utils/api";
import statecity from "../data/statecity";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddVenue = () => {
  const [imageFile, setImageFile] = useState(null);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setStates(statecity.state_arr);
  }, []);

  const validationSchema = yup.object({
    name: yup.string().required("Venue name is required"),
    price: yup
      .number()
      .required("Price is required")
      .positive("Price must be positive"),
    state: yup.string().required("State is required"),
    city: yup.string().required("City is required"),
    address: yup.string().required("Address is required"),
    image: yup.mixed().required("Image is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      state: "",
      city: "",
      address: "",
      image: null,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("image", imageFile);
      formData.append("price", values.price);
      formData.append("state", values.state);
      formData.append("city", values.city);
      formData.append("address", values.address);

      try {
        const { data } = await privateApi.post("/addvenues", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Show success toast
        toast.success("Venue added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });

        resetForm(); // Reset form fields
        setImageFile(null); // Reset image field
        setCities([]); // Clear cities dropdown

        // Navigate to Venue list after 3 seconds
        setTimeout(() => navigate("/venueshow"), 3000);
      } catch (error) {
        console.error("Error adding venue:", error);

        // Show error toast
        toast.error("Failed to add venue. Please try again!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    },
  });

  const handleStateChange = (event) => {
    const index = event.target.selectedIndex;
    const selectedState = event.target.value;
    formik.setFieldValue("state", selectedState);
    const citiesString = statecity.s_a[index];
    const citiesArray = citiesString.split("|").map((city) => city.trim());
    setCities(citiesArray);
  };

  return (
    <div className="relative w-screen h-full flex items-center bg-gradient-to-b from-gray-700 to-gray-950 justify-center overflow-hidden">
        
    <div className="z-10 max-w-5xl mx-auto p-8 bg-gradient-to-t from-gray-800 to-gray-950 hover:bg-gradient-to-r from-gray-920 to-gray-950 rounded-xl shadow-lg mt-32 mb-10 w-100">
      
      <ToastContainer /> {/* Toast container for notifications */}
      <h2 className="text-2xl font-semibold text-center text-white mb-6">Add New Venue</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {[ 
          { label: "Venue Name", name: "name", type: "text" },
          { label: "Price Per Hour", name: "price", type: "number" },
          { label: "Address", name: "address", type: "text" },
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
            />
            {formik.touched[name] && formik.errors[name] && (
              <div className="text-red-500 text-sm mt-1">{formik.errors[name]}</div>
            )}
          </div>
        ))}

        <div>
          <label className="block text-slate-300 font-medium">Image Upload</label>
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
            <div className="text-red-500 text-sm mt-1">{formik.errors.image}</div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">  
        <div>
          <label className="block text-slate-300 font-medium">State</label>
          <select
            name="state"
            value={formik.values.state}
            onChange={(e) => {
              handleStateChange(e);
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            className="mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400 w-full"
          >
            <option value="">Select State</option>
            {states.map((st, index) => (
              <option key={index} value={st}>{st}</option>
            ))}
          </select>
          {formik.touched.state && formik.errors.state && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.state}</div>
          )}
        </div>

        <div>
          <label className="block text-slate-300 font-medium">City</label>
          <select
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400 w-full"
            disabled={!formik.values.state}
          >
            <option value="">Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
          {formik.touched.city && formik.errors.city && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.city}</div>
          )}
        </div>
        </div>
<br />
        <button
          type="submit"
          className="h-18 w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-md transition-all duration-300"
        >
          Add Venue
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddVenue;
