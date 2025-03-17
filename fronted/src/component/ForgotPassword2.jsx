import React, { useState } from "react";
import { publicApi } from "../utils/api";
import { motion } from "framer-motion";
import backgroundVideo from "../assets/cricket-stadium.mov";

function ForgotPassword2() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSendOtp = async () => {
    try {
      const response = await publicApi.post("/send-otp", { email });
      if (response.status === 200) {
        setIsOtpSent(true);
        alert("OTP sent to your email!");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Error sending OTP or invalid user. Please try again.");
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await publicApi.post("/reset-password", {
        email,
        otp,
        newPassword,
      });
      if (response.status === 200) {
        alert("Password reset successfully!");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Error resetting password. Please try again.");
    }
  };

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
        <h2 className="text-3xl font-bold text-center text-white">Forgot Password 🏏</h2>
        <div className="space-y-5">
          <div>
            <label className="text-base font-medium text-slate-300">Email address</label>
            <div className="mt-2">
              <input
                className="mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400 w-full"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <button onClick={handleSendOtp} className="mt-2 p-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-md transition-all duration-300 w-full">
            Send OTP
          </button>

          {isOtpSent && (
            <>
              <div>
                <label className="text-base font-medium text-slate-300">OTP</label>
                <div className="mt-2">
                  <input
                    className="mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400 w-full"
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-base font-medium text-slate-300">New Password</label>
                <div className="mt-2">
                  <input
                    className="mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400 w-full"
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>

              <button onClick={handleResetPassword} className="mt-2 p-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md transition-all duration-300 w-full">
                Reset Password
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default ForgotPassword2;
