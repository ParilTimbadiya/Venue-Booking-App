import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { publicApi } from '../utils/api'; // Importing the publicApi for API calls
import './Booking.css'; // Importing existing styles

const PremiumPayment = () => {
  const [months, setMonths] = useState(1);
  const [email, setEmail] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [debitCardNumber, setDebitCardNumber] = useState('');
  const [pin, setPin] = useState('');
    const navigate = useNavigate();
  

  useEffect(() => {
    const calculateTotal = () => {
      const pricePerMonth = 5999; // Example price per month
      setTotalAmount(pricePerMonth * months);
    };
    calculateTotal();
  }, [months]);

  const [expirationDate, setExpirationDate] = useState(''); // State for expiration date

  useEffect(() => {
    const fetchExpirationDate = async () => {
      try {
        const response = await publicApi.get('/expire'); // Fetch expiration date
        const expirationDate = new Date(response.data); // Assuming the response contains expirationDate
        setExpirationDate(`${expirationDate.getDate()}/${expirationDate.getMonth() + 1}/${expirationDate.getFullYear()}`); // Format as MM/YYYY
      } catch (error) {
        console.error("Error fetching expiration date:", error);
      }
    };

    fetchExpirationDate();
  }, []);

  
  const handlePayment = async () => {
    const paymentDetails = {
      months,
      email,
      totalAmount,
      debitCardNumber,
      pin,
    };

    try {
      const response = await publicApi.post('/merchantPayment', paymentDetails); // Send payment details
      console.log('Payment response:', response.data);
      navigate("/venueshow")
    } catch (error) {
      console.error("Error processing payment:", error);
    }
    // Implement payment logic here
    console.log('Payment submitted:', { months, email, totalAmount, debitCardNumber, pin });
  };

  return (
    <div className="p-5 mt-12 mb-12 max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Premium Of Venue Host</h1>
      <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 flex items-center">
            <span className="mr-2">Expiration Date:</span>
            <input
              type="text"
              value={expirationDate}
              readOnly
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 flex items-center">
            <span className="mr-2">Increase Months:</span>
            <i className="fas fa-calendar-alt text-gray-400"></i>
          </label>
          <input
            type="number"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            min="1"
            max="12"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 flex items-center">
            <span className="mr-2">Email:</span>
            <i className="fas fa-envelope text-gray-400"></i>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 flex items-center">
            <span className="mr-2">Total Amount:</span>
            <i className="fas fa-money-bill-wave text-gray-400"></i>
          </label>
          <input
            type="text"
            value={`₹${totalAmount}`}
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 flex items-center">
            <span className="mr-2">Debit Card Number:</span>
            <i className="fas fa-credit-card text-gray-400"></i>
          </label>
          <input
            type="text"
            value={debitCardNumber}
            onChange={(e) => setDebitCardNumber(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 flex items-center">
            <span className="mr-2">PIN:</span>
            <i className="fas fa-lock text-gray-400"></i>
          </label>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700">Pay Now</button>
      </form>
    </div>
  );
};

export default PremiumPayment;
