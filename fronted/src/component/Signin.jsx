import React, { useState } from "react";
import Cookies from "js-cookie";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { publicApi } from "../utils/api";
import { motion } from "framer-motion";
import backgroundVideo from "../assets/cricket-stadium.mov";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react"; // Import eye 

function Signin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  

  const { touched, handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("**Enter valid email").required("**Email is required"),
      password: yup.string().min(8, "**Password length must be at least 8").required("**Password is required"),
    }),
    onSubmit: async (loginData) => {
      setLoading(true);
      try {
        const data = await publicApi.post("/signin", loginData);
        if (data.status === 200) {
          // Set tokens or user info in local storage or cookies
          localStorage.setItem("auth", data.data.message);
          localStorage.setItem("role", data.data.role);
          Cookies.set("auth", data.data.message, { path: "/" });
          Cookies.set("role", data.data.role, { path: "/" });

          // toast.success("Login successful! Redirecting...");
          setTimeout(() => {
          const role = data.data.role;
          if(role=="admin"){
            navigate("/orderData");
          }
          else if(role=="merchant"){
            navigate("/bookingData")
          }else
            navigate("/");
            window.location.reload(); // Optional, if you want to refresh the user state
          }, 2500);
        }
      } catch (ex) {
        const status = ex.response?.status;
        const msg = ex.response?.data?.message;

        if (status === 404) {
          toast.error("Account not found. Please sign up first.");
        } else if (status === 400) {
          toast.error("Invalid email or password.");
        } else if (status === 500) {
          toast.error("Something went wrong on the server. Please try again later.");
        } else {
          toast.error(msg || "Login failed. Please check your internet or try again.");
        }

        console.error(ex);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="relative font-my w-screen h-screen flex items-center justify-center overflow-hidden">
      <ToastContainer position="top-right" autoClose={3000} />

      <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover">
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-[720px] bg-gradient-to-t from-gray-800 to-gray-950 hover:bg-gradient-to-r from-gray-850 to-gray-950 shadow-lg shadow-blue-500/50 rounded-xl p-8 "
      >
        <h2 className="text-3xl font-bold text-center font-my text-white">Welcome Back</h2>
        <p className="text-center text-gray-400 text-sm mt-1">
          Don't have an account?{" "}
          <Link to="/signup" className="text-yellow-400 hover:underline hover:text-white">
            Create a new account
          </Link>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label className="text-base font-medium text-slate-300">Email address</label>
              <input
                className="mt-1 p-2 w-full rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400"
                type="email"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
              />
              <p className="text-sm text-red-600 font-semibold">
                {errors.email && touched.email && errors.email}
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-base font-medium text-slate-300">Password</label>
                <Link to="/forgotPassword" className="text-sm font-semibold text-gray-400 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input
                className="mt-1 p-2 w-full rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
              />
              {errors.password && touched.password && (
              <p className="text-sm text-red-600 font-semibold">
                {errors.password && touched.password && errors.password}
              </p>
              )}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-10 top-[120px] flex items-center text-gray-400 hover:text-white"
                >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div>
              <button
                type="submit"
                className="h-18 w-full flex items-center justify-center py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-md transition-all duration-300"
                disabled={loading}
              >
                {loading ? (
                  <div className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></div>
                ) : (
                  "Get started"
                )}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default Signin;








// import React from "react";
// import Cookies from "js-cookie"; // Importing js-cookie for cookie management

// import * as yup from "yup";
// import { useFormik } from "formik";
// import { Link, useNavigate } from "react-router-dom";
// import { publicApi } from "../utils/api";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import backgroundVideo from "../assets/cricket-stadium.mov";
// import { round } from "lodash";

// function Signin() {
//   const navigate = useNavigate();
//   const { touched, handleSubmit, handleChange, values, errors } = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: yup.object({
//       email: yup
//         .string()
//         .email("**Enter valid email")
//         .required("**Email is required"),
//       password: yup
//         .string()
//         .min(8, "**password length must be at least 8")
//         .required("**Password is required"),
//     }),
//     onSubmit: async (loginData) => {
//       console.log("Logging in with data:", loginData); // Log the login data
//       try {
//         const data = await publicApi.post("/signin", loginData);
//         console.log(data);
//         if (data.status == 200) {
//         function setCookie(name, value) {
//           document.cookie = name + " " + value;
//         }
//           console.log(data.data.message);
//           localStorage.setItem("auth", data.data.message);
//           localStorage.setItem("role", data.data.role);
//           // Set cookies for auth and role
//           Cookies.set("auth", data.data.message, { path: '/' });
//           Cookies.set("role", data.data.role, { path: '/' });

//           setCookie("auth", data.data.message);
//           setCookie("role",data.data.role);
//           const role = data.data.role;
//           if(role=="admin"){
//             navigate("/orderData");
//           }
//           else if(role=="merchant"){
//             navigate("/bookingData")
//           }else
//             navigate("/");
//           window.location.reload();
//         } else if (data.status === 403) {
//           alert("Invalid credentials");
//         } else if (data.status === 500) {
//           alert("Internal server error");
//         } else {
//           alert("Invalid credentials");
//         }
//       } catch (ex) {
//         if(ex.status === 400){
//           alert("Invalid credentials");
//         }else if (ex.status === 500) {
//           alert("Internal server error");
//         } else {
//           alert("Invalid credentials");
//         }
//         console.log(ex);
//       }
//     },
//   });

//   return (
//     <>
//       <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
//             <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover">
//               <source src={backgroundVideo} type="video/mp4" />
//             </video>
//             <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            
//             <motion.div
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="relative z-10 w-[720px] bg-gradient-to-t from-gray-800 to-gray-950 hover:bg-gradient-to-r from-gray-850 to-gray-950 shadow-lg shadow-blue-500/50 rounded-xl p-8 mt-20"
//             >
//                   <h2 className="text-3xl font-bold text-center text-white">Sign In 🏏</h2>
//                           <p className="text-center text-gray-400 text-sm mt-1">
//                           Don't have an account? <Link to="/signup" className="text-yellow-400 hover:underline">Create a new account</Link>
//                           </p>
//                   <form onSubmit={handleSubmit}>
//                     <div className="space-y-5 b">
//                       <div>
//                         <label
//                           htmlFor=""
//                           className="text-base font-medium text-slate-300"
//                         >
//                           Email address
//                         </label>
//                         <div className="mt-2">
//                           <input
//                             className="mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400 w-full"
//                             type="email"
//                             name="email"
//                             placeholder="Email"
//                             value={values.email}
//                             onChange={handleChange}
//                           />
//                         </div>
//                         <p className="text-sm text-red-600 font-semibold">
//                           {errors.email && touched.email && errors.email}
//                         </p>
//                       </div>
                      
//                       <div  >
//                         <div className="flex items-center justify-between">
//                           <label
//                             htmlFor=""
//                             className="text-base font-medium text-slate-300"
//                           >
//                             Password
//                           </label>
//                           <Link to="/forgotPassword"
//                             title=""
//                             className="text-sm font-semibold text-gray-400 hover:underline"
//                           >
//                             Forgot password?
//                           </Link>
//                         </div>
//                         <div className="mt-2">
//                           <input
//                             className="mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400 w-full"
//                             type="password"
//                             placeholder="Password"
//                             value={values.password}
//                             name="password"
//                             onChange={handleChange}
//                           />
//                         </div>
//                         <p className="text-sm text-red-600 font-semibold">
//                           {errors.password && touched.password && errors.password}
//                         </p>
//                       </div>
                            
//                       <div>
//                         <button
//                           type="submit"
//                           className="h-18 w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-md transition-all duration-300"
//                         >
//                           Get started ↣
                          
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                   {/* <div className="mt-4 space-y-4 ">
//                     <button
//                       type="button"
//                       className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
//                     >
//                       <span className="mr-2 inline-block">
//                         <svg
//                           className="h-6 w-6 text-rose-500"
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 24 24"
//                           fill="currentColor"
//                         >
//                           <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
//                         </svg>
//                       </span>
//                       Sign in with Google
//                     </button>
//                     <button
//                       type="button"
//                       className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
//                     >
//                       <span className="mr-2 inline-block">
//                         <svg
//                           className="h-6 w-6 text-[#2563EB]"
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 24 24"
//                           fill="currentColor"
//                         >
//                           <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
//                         </svg>
//                       </span>
//                       Sign in with Facebook
//                     </button>
//                   </div> */}
//         </motion.div>
//         </div>  
//     </>
//   );
// }
// export default Signin;
