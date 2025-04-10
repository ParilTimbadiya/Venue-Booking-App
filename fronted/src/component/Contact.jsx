import React, { useState } from 'react';
import "./Contact.css";
import { toast, ToastContainer } from "react-toastify";

import { publicApi } from "../utils/api"; // Importing the API for backend communication

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await publicApi.post("/contact", formData); // Sending data to the backend
      if (response.status === 200) {
        toast.success('Your message has been sent successfully!');
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error('An error occurred. Please try again later.');
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="contact-us-container ">
            <ToastContainer position="top-right" autoClose={3000} />

      <div className="contact-content ">
        <div className="form-section">
          <h1 className="contact-title">CONTACT US</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input mt-1 p-2 rounded-md bg-gray-300 text-Black border border-gray-600 focus:ring-2 focus:ring-green-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input mt-1 p-2 rounded-md bg-gray-300 text-black border border-gray-600 focus:ring-2 focus:ring-green-400"
            />
            <textarea
              name="message"
              placeholder="Enter your message here..."
              value={formData.message}
              onChange={handleChange}
              required
              className="form-textarea mt-1 p-2 rounded-md bg-gray-300 text-black border border-gray-600 focus:ring-2 focus:ring-green-400"
            />
            
            <button type="submit" className="w-full h-18 flex items-center justify-center rounded-md transition-all duration-300 bg-green-500 text-white py-2 hover:bg-green-600">
            {loading ? (
                  <div className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></div>
                ) : (
                  "Contact Us"
                )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
