import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { publicApi } from '../utils/api'; // Importing the publicApi for API calls
import './Booking.css'; // Importing existing styles

const PremiumPayment = () => {
  const [months, setMonths] = useState(1);
  const [email, setEmail] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [debitCardNumber, setDebitCardNumber] = useState('');
  const [pricePerMonth, setPricePerMonth] = useState(5999);
    const navigate = useNavigate();
  

  useEffect(() => {
    const calculateTotal = () => {
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
      // email,
      totalAmount,
      debitCardNumber,
      // pin,
    };

    try {
      const response = await publicApi.post('/merchantPayment', paymentDetails); // Send payment details
      setTimeout(() => {
        toast.success("Payment Successfully..")
      }, 2500);
        navigate("/venueshow")
    } catch (error) {
      toast.error("Error processing payment:", error);
    }
    // Implement payment logic here
    console.log('Payment submitted:', { months, email, totalAmount, debitCardNumber, pin });
  };

  return (
    <div className=" mt-12 mb-12 max-w-lg mx-auto bg-gray-800 shadow-md rounded-lg p-6">
            <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-3xl font-bold mb-6 text-center text-[#6eb4ef]">Premium Of Venue Host</h1>
      <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }} className="space-y-4">
        <div>
          <label className="  text-sm font-medium text-[#a0aec0] flex items-center">
            <span className="mr-2">Expiration Date:</span>
            <input
              type="text"
              value={expirationDate}
              readOnly
              className="mt-1   w-full border border-gray-300 rounded-md p-2 bg-[#0c131a] text-white"
            />
          </label>
        </div>
        <div>
          <label className="  text-sm font-medium text-[#a0aec0] flex items-center">
            <span className="mr-2">Increase Months:</span>
            <i className="fas fa-calendar-alt text-gray-400"></i>
          </label>
          <input
            type="number"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            min="1"
            max="12"
            className="mt-1   w-full border border-gray-300 bg-[#0c131a] text-white rounded-md p-2"
          />
        </div>
        {/* <div>
          <label className="  text-sm font-medium  text-[#a0aec0] flex items-center">
            <span className="mr-2">Email:</span>
            <i className="fas fa-envelope text-gray-400"></i>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1   w-full border border-gray-300 bg-[#0c131a] text-white rounded-md p-2"
          />
        </div> */}
        <div>
          <label className="  text-sm font-medium  text-[#a0aec0] flex items-center">
            <span className="mr-2">Total Amount:</span>
            <i className="fas fa-money-bill-wave text-gray-400"></i>
          </label>
          <input
            type="text"
            value={`₹${totalAmount}`}
            readOnly
            className="mt-1   w-full border border-gray-300 rounded-md bg-[#0c131a] text-white p-2"
          />
        </div>
        <div>
          <label className="  text-sm font-medium  text-[#a0aec0] flex items-center">
            <span className="mr-2">UPI</span>
            <i className="fas fa-credit-card text-gray-400"></i>
          </label>
          <input
            type="text"
            placeholder="example@upi"
            value={debitCardNumber}
            onChange={(e) => setDebitCardNumber(e.target.value)}
            required
            className="mt-1   w-full border border-gray-300 rounded-md bg-[#0c131a] text-white p-2"
          />
        </div>
        {/* <div>
          <label className=" text-sm font-medium  text-[#a0aec0] flex items-center">
            <span className="mr-2">PIN:</span>
            <i className="fas fa-lock text-gray-400"></i>
          </label>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
            className="mt-1   w-full border border-gray-300 rounded-md bg-[#0c131a] text-white p-2"
          />
        </div> */}
        <button type="submit" className="w-full border-[1px] border-[#6eb5ef40] bg-[#6eb4ef14] rounded-md py-2 text-[#6eb4ef]   cursor-pointer font-medium">Pay Now</button>
      </form>
    </div>
  );
};

export default PremiumPayment;
