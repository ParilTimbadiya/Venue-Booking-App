import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./Contact.css"; // Reusing styles from Contact.css
import { publicApi } from "../utils/api"; // Importing the API for backend communication

const BecomeMerchant = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await publicApi.post("/becomeMerchant"); // Sending data to the backend
      if (response.status === 200) {
        toast.success('Your request to become a merchant has been submitted successfully!');
        setTimeout(() => {
         navigate("/");
          
          }, 2500);
      } else {
        toast.error('Failed to submit request. Please try again.');
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="contact-us-container">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="contact-content">
        <div className="form-section">
          <h1 className="contact-title">BECOME A MERCHANT</h1>
          <form onSubmit={handleSubmit}>
            {/* <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input mt-1 p-2 rounded-md bg-gray-300 text-black border border-gray-600 focus:ring-2 focus:ring-green-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input mt-1 p-2 rounded-md bg-gray-300 text-black border border-gray-600 focus:ring-2 focus:ring-green-400"
            /> */}
            <button type="submit" className="submit-button w-full mt-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md transition-all duration-300 hover:ring-2 hover:ring-green-400">
              I want to become a merchant
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BecomeMerchant;
