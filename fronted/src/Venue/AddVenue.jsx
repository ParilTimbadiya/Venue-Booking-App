import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { privateApi } from "../utils/api";
import statecity from "../data/statecity";
import { useFormik } from "formik";
import * as yup from "yup";

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
    price: yup.number().required("Price is required").positive("Price must be positive"),
    state: yup.string().required("State is required"),
    city: yup.string().required("City is required"),
    address: yup.string().required("Address is required"),
    image: yup.mixed().required("Image is required")
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      state: "",
      city: "",
      address: "",
      image: null
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("image", imageFile);
      formData.append("price", values.price);
      formData.append("state", values.state);
      formData.append("city", values.city);
      formData.append("address", values.address);

      try {
        const data = await privateApi.post("/addvenues", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(data);
        navigate("/venue");
      } catch (error) {
        console.error("Error adding venue:", error);
      }
    }
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
    <div className="bg-white p-10 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Add New Venue</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Venue Name
          </label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImageFile(e.target.files[0]);
              formik.setFieldValue("image", e.target.files[0]);
            }}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          {formik.touched.image && formik.errors.image && (
            <div className="text-red-500 text-sm">{formik.errors.image}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Price (Per Hour In Rupees)
          </label>
          <input
            type="number"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          {formik.touched.price && formik.errors.price && (
            <div className="text-red-500 text-sm">{formik.errors.price}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            State
          </label>
          <select
            name="state"
            value={formik.values.state}
            onChange={(e) => {
              handleStateChange(e);
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700"
          >
            <option value="">Select State</option>
            {states.map((st, index) => (
              <option key={index} value={st}>
                {st}
              </option>
            ))}
          </select>
          {formik.touched.state && formik.errors.state && (
            <div className="text-red-500 text-sm">{formik.errors.state}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            City
          </label>
          <select
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700"
            disabled={!formik.values.state}
          >
            <option value="">Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
          {formik.touched.city && formik.errors.city && (
            <div className="text-red-500 text-sm">{formik.errors.city}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Full Address
          </label>
          <input
            type="text"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          {formik.touched.address && formik.errors.address && (
            <div className="text-red-500 text-sm">{formik.errors.address}</div>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Venue
        </button>
      </form>
    </div>
  );
};

export default AddVenue;
