import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import statecity from "../data/statecity";
import { publicApi } from "../utils/api";
import { motion } from "framer-motion";
import backgroundVideo from "../assets/cricket-stadium.mov";

const Signup = () => {
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    setStates(statecity.state_arr);
  }, []);

  const handleStateChange = (event) => {
    const index = event.target.selectedIndex;
    const selectedState = event.target.value;
    setSelectedState(selectedState);
    setFieldValue("state", selectedState);
    setCities(statecity.s_a[index]?.split("|").map((city) => city.trim()) || []);
  };

  const validationSchema = yup.object({
    fullName: yup.string().min(2, "Full name must be at least 2 characters").required("Full name is required"),
    userName: yup.string().min(2, "Username must be at least 2 characters").required("Username is required"),
    email: yup.string().email("Enter a valid email").required("Email is required"),
    state: yup.string().required("State is required"),
    city: yup.string().required("City is required"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  });

  const { touched, handleSubmit, handleChange, values, errors, setFieldValue } = useFormik({
    initialValues: { fullName: "", userName: "", email: "", state: "", city: "", password: "" },
    validationSchema,
    onSubmit: async (signUpData) => {
      try {
        const res = await publicApi.post("/signup", signUpData);
        if (res.status === 200) navigate("/signin");
      } catch (ex) {
        if (ex.status == 406) alert("User already exist!")
        console.error("Signup error:", ex);
      }
    },
  });

  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover">
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-[720px] bg-gradient-to-t from-gray-800 to-gray-950 hover:bg-gradient-to-r from-gray-850 to-gray-950 shadow-lg shadow-blue-500/50 rounded-xl p-8 mt-20"
      >
        <h2 className="text-3xl font-bold text-center text-white">🏏 Sign Up</h2>
        <p className="text-center text-gray-400 text-sm mt-1">
          Already have an account? <Link to="/signin" className="text-yellow-400 hover:underline">Sign in</Link>
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            {['fullName', 'userName'].map((field, idx) => (
              <div key={idx} className="flex flex-col">
                <label className="text-sm font-medium text-gray-300">{field === 'fullName' ? 'Full Name' : 'Username'}:</label>
                <input
                  type="text"
                  name={field}
                  value={values[field]}
                  onChange={handleChange}
                  placeholder={`Enter your ${field}`}
                  className="mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400"
                />
                {errors[field] && touched[field] && <p className="text-sm text-red-600">{errors[field]}</p>}
              </div>
            ))}
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-300">Email:</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400"
            />
            {errors.email && touched.email && <p className="text-sm text-red-600">{errors.email}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-300">State:</label>
              <select
                name="state"
                value={selectedState}
                onChange={handleStateChange}
                className="mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400"
              >
                <option value="">Select State</option>
                {states.map((st, index) => <option key={index} value={st}>{st}</option>)}
              </select>
              {errors.state && touched.state && <p className="text-sm text-red-600">{errors.state}</p>}
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-300">City:</label>
              <select
                name="city"
                value={values.city}
                onChange={handleChange}
                className="mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400"
                disabled={!selectedState}
              >
                <option value="">Select City</option>
                {cities.map((city, index) => <option key={index} value={city}>{city}</option>)}
              </select>
              {errors.city && touched.city && <p className="text-sm text-red-600">{errors.city}</p>}
            </div>
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-300">Password:</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400"
            />
            {errors.password && touched.password && <p className="text-sm text-red-600">{errors.password}</p>}
          </div>
          
          <button type="submit" className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-md transition-all duration-300">Sign Up 🏆</button>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;