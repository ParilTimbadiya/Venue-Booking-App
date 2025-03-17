import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { publicApi } from "../utils/api";
import { motion } from "framer-motion";
import backgroundVideo from "../assets/cricket-stadium.mov";

function ForgotPassword() {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const { touched, handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      email: "",
      otp: "",
      newPassword: "",
      isNewPasswordEnabled: false, // New state for enabling the new password field

    },
    
    validationSchema: yup.object({
      email: yup.string().email("**Enter valid email").required("**Email is required"),
      otp: yup.string().required("**OTP is required").when('isOtpSent', {
        is: true,
        then: yup.string().required("**OTP is required"),
      }),
      newPassword: yup.string().min(8, "**New password length must be at least 8").when('isOtpSent', {
        is: true,
        then: yup.string().required("**New password is required"),
      }),
    }),
    onSubmit: async (data) => {
      console.log("Form submitted with data:", data); // Log the submitted data
      if (!isOtpSent) {
        setIsNewPasswordEnabled(false); // Disable new password field when sending OTP

        console.log("Sending OTP..."); // Log when sending OTP
        try {
          const response = await publicApi.post("/send-otp", { email: data.email });
          console.log("Response from OTP API:", response); // Log the response
          
          if (response.status === 200) {
            setIsOtpSent(true);
            setIsNewPasswordEnabled(true); // Enable new password field after OTP is sent
            alert("OTP sent to your email!");

          }
        } catch (error) {
          console.error("Error sending OTP:", error); // Log any errors
          alert("Error sending OTP. Please try again.");
        }
      } else {
        console.log("Resetting password..."); // Log when resetting password
        try {
          const response = await publicApi.post("/reset-password", {
            email: data.email,
            otp: data.otp,
            newPassword: data.newPassword,
          });
          console.log("Response from Reset Password API:", response); // Log the response
          
          if (response.status === 200) {
            alert("Password reset successfully!");
          }
        } catch (error) {
          console.error("Error resetting password:", error); // Log any errors
          alert("Error resetting password. Please try again.");
        }
      }
      console.log("Complete process");
      
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
        <h2 className="text-3xl font-bold text-center text-white">Forgot Password 🏏</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-base font-medium text-slate-300">Email address</label>
            <div className="mt-2">
              <input
                className="mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400 w-full"
                type="email"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
              />
            </div>
            <p className="text-sm text-red-600 font-semibold">{errors.email && touched.email && errors.email}</p>
          </div>

          {isOtpSent && (
            <>
              <div>
                <label className="text-base font-medium text-slate-300">OTP</label>
                <div className="mt-2">
                  <input
                    className="mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400 w-full"
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    value={values.otp}
                    onChange={handleChange}
                  />
                </div>
                <p className="text-sm text-red-600 font-semibold">{errors.otp && touched.otp && errors.otp}</p>
              </div>

              <div>
                <label className="text-base font-medium text-slate-300">New Password</label>
                <div className="mt-2">
                  <input
                    className="mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400 w-full"
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={values.newPassword}
                    onChange={handleChange}
                  />
                </div>
                <p className="text-sm text-red-600 font-semibold">{errors.newPassword && touched.newPassword && errors.newPassword}</p>
              </div>
            </>
          )}

          <div>
            <button
              type="submit"
              className="h-18 w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-md transition-all duration-300"
            >
              {isOtpSent ? "Reset Password" : "Send OTP"} ↣
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default ForgotPassword;
