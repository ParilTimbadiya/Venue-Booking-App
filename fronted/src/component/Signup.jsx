import React from "react";
import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
// import OtpScreen from "./OtpScreen";
import statecity from "../data/statecity";
import { useNavigate } from "react-router-dom";
import {publicApi} from "../utils/api";
import { useEffect } from "react";

function Signup() {
  // const [displayOtpScreen, setDisplayOtpScrren] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const navigate = useNavigate();
  
  useEffect(() => {
    setStates(statecity.state_arr);
    console.log("fetch state and city");
  }, []);
  const handleStateChange = (event) => {
    const index = event.target.selectedIndex;
    const selectedState = event.target.value;
    setSelectedState(selectedState); // Update local state
    setFieldValue("state", selectedState); // Update form state
    const citiesString = statecity.s_a[index];
    const citiesArray = citiesString.split("|").map((city) => city.trim());
    setCities(citiesArray);
  };

    const { touched, handleSubmit, handleChange, values, errors, setFieldValue } = useFormik({
    initialValues: {
      fullName: "",
      userName: "",
      email: "",
      state: "",
      city: "",
      password: "",
    },
    validationSchema: yup.object({
      fullName: yup
        .string()
        .min(2, "**fullname length must be atlest 2")
        .required("**Fullname is required"),
      userName: yup
        .string()
        .min(2, "**username length must be atlest 2")
        .required("**Username is required"),
      state: yup.string().required("State is required"), // Updated here
      city: yup.string().required("city is required"),
      email: yup
        .string()
        .email("**Enter valid email")
        .required("**Email is required"),
      password: yup
        .string()
        .min(8, "**password length must be atlest 8")
        .required("**Password is required"),
    }),
    onSubmit: async (signUpData) => {
      console.log(signUpData);
      try {
        const res = await publicApi.post("/signup", signUpData);
        if (res.status == 200) {
          console.log(signUpData);
          navigate("/signin");
        }
        console.log(res);
      } catch (ex) {
        console.log(ex);
      }
    },
  });
  // if (displayOtpScreen) {
  //   return <OtpScreen email={values.email}></OtpScreen>;
  // }
  return (
    <>
      <div className="  h-[100vh] bg-[#152331]">
        <div className="w-[500px] h-[600px] bg-[#152331] mx-auto rounded-xl">
          <div>
            <section className="rounded-md ">
              <div className="flex items-center justify-center ">
                <div className=" ">
                  <div className=" w-full items-center  mt-5">
                    <h2 className="text-2xl font-bold leading-tight   text-gray-300 text-center ">
                      Create account
                    </h2>
                    <div className="flex text-center mt-2 ml-12">
                      <h6 className="text-[#53abf3]  ml-[50px] mr-1">
                        Already have an account?
                      </h6>

                      <Link
                        to={"/signin"}
                        title=""
                        className="font-semibold text-[#00bcd4] transition-all duration-200 hover:underline text-center"
                      >
                        Sign In
                      </Link>
                    </div>
                  </div>

                  <form method="POST" onSubmit={handleSubmit} className="mt-8">
                    <div className="space-y-5 b">
                      <div className="flex flex-col space-y-4">
                        <div className="flex gap-4">
                          {/* Username Input */}
                          <div className="flex flex-col space-y-2 flex-1">
                            <label
                              htmlFor="Name"
                              className="text-base font-medium text-slate-300"
                            >
                              Name
                            </label>
                            <input
                              className="h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-gray-400"
                              type="text"
                              value={values.fullName}
                              name="fullName"
                              placeholder="Enter your Name"
                              onChange={handleChange}
                            />
                            <p className="text-sm text-red-600 font-semibold">
                              {errors.fullName &&
                                touched.fullName &&
                                errors.fullName}
                            </p>
                          </div>

                          <div className="flex flex-col space-y-2 flex-1">
                            <label className="text-base font-medium text-slate-300">
                              Username
                            </label>
                            <input
                              className="h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-gray-400"
                              type="text"
                              placeholder="Enter your Username"
                              name="userName"
                              value={values.userName}
                              onChange={handleChange}
                            />
                            <p className="text-sm text-red-600 font-semibold">
                              {errors.userName &&
                                touched.userName &&
                                errors.userName}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor=""
                          className="text-base font-medium text-slate-300"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-gray-400"
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                          ></input>
                          <p className="text-sm text-red-600 font-semibold">
                            {errors.email && touched.email && errors.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 flex-1">
                        <label className="text-base font-medium text-slate-300">
                          State
                        </label>
                        <select
                          name="state"
                          value={selectedState}
                          onChange={handleStateChange}
                          className="h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm  text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                        >
                          <option value="">Select State</option>
                          {states.map((st, index) => (
                            <option id={index} key={index} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                        <p className="text-sm text-red-600 font-semibold">
                          {errors.state && touched.state && errors.state}
                        </p>
                      </div>
                      <div className="flex flex-col space-y-2 flex-1">
                        <label className="text-base font-medium text-slate-300">
                          City
                        </label>
                        <select
                          name="city"
                          value={values.city}
                          onChange={handleChange}
                          placeholder="state"
                          className="h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                          disabled={!selectedState}
                        >
                          <option value="">Select City</option>
                          {cities.map((city, index) => (
                            <option key={index} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>
                        <p className="text-sm text-red-600 font-semibold">
                          {errors.city && touched.city && errors.city}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor=""
                            className="text-base font-medium text-slate-300"
                          >
                            Password
                          </label>
                        </div>
                        <div className="mt-2">
                          <input
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-gray-400"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                          ></input>
                          <p className="text-sm text-red-600 font-semibold">
                            {errors.password &&
                              touched.password &&
                              errors.password}
                          </p>
                        </div>
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                        >
                          Create account
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="ml-2"
                          >
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* <div className="mt-2 space-y-3 ">
                    <button
                      type="button"
                      className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                    >
                      <span className="mr-2 inline-block">
                        <svg
                          className="h-6 w-6 text-rose-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                        </svg>
                      </span>
                      Sign up with Google
                    </button>
                    <button
                      type="button"
                      className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                    >
                      <span className="mr-2 inline-block">
                        <svg
                          className="h-6 w-6 text-[#2563EB]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                        </svg>
                      </span>
                      Sign up with Facebook
                    </button>
                  </div> */}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
export default Signup;
