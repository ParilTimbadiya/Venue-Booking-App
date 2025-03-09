import React, { useState } from 'react';
import "./Contact.css";
import { publicApi } from "../utils/api"; // Importing the API for backend communication

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    try {
      const response = await publicApi.post("/contact", formData); // Sending data to the backend
      if (response.status === 200) {
        alert('Your message has been sent successfully!');
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="contact-us-container ">
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
            <button type="submit" className="submit-button w-full py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md transition-all duration-300 hover:ring-2 hover:ring-green-400">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
