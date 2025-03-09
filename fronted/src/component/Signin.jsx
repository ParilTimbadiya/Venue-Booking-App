import React from "react";
import Cookies from "js-cookie"; // Importing js-cookie for cookie management

import * as yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { publicApi } from "../utils/api";
import { useState } from "react";

function Signin() {
  const navigate = useNavigate();
  const { touched, handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("**Enter valid email")
        .required("**Email is required"),
      password: yup
        .string()
        .min(8, "**password length must be at least 8")
        .required("**Password is required"),
    }),
    onSubmit: async (loginData) => {
      console.log("Logging in with data:", loginData); // Log the login data
      try {
        const data = await publicApi.post("/signin", loginData);
        console.log(data);
        if (data.status === 200) {
          console.log(data.data.message);
          localStorage.setItem("auth", data.data.message);
          localStorage.setItem("role", data.data.role);
          Cookies.set("auth", data.data.message, { expires: 7 }); // Set cookie for auth token accessible across all ports

          navigate("/");
          window.location.reload();
        } else if (data.status === 403) {
          alert("Invalid credentials");
        } else if (data.status === 500) {
          alert("Internal server error");
        } else {
          alert("Invalid credentials");
        }
      } catch (ex) {
        console.log(ex);
      }
    },
  });

  return (
    <>
      <div className="w-screen h-screen bg-[#152331]">
        <div className="w-[500px] h-[600px] bg-[#152331] absolute mt-16 ml-[550px] rounded-xl">
          <div>
            <section className="rounded-md">
              <div className="flex items-center justify-center">
                <div>
                  <div className="w-full items-center mt-5 mb-3">
                    <h2 className="text-xl font-bold leading-tight text-gray-300 text-center">
                      Sign in to your account
                    </h2>
                    <div className="flex text-center mt-2">
                      <h6 className="text-[#53abf3] ml-[50px] mr-1">
                        Don&#x27;t have an account?
                      </h6>
                      <Link
                        to="/signup"
                        title=""
                        className="font-semibold text-[#00bcd4] transition-all duration-200 hover:underline text-center"
                      >
                        Create a free account
                      </Link>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="space-y-5 b">
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
                            name="email"
                            placeholder="Email"
                            value={values.email}
                            onChange={handleChange}
                          />
                        </div>
                        <p className="text-sm text-red-600 font-semibold">
                          {errors.email && touched.email && errors.email}
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
                          <a
                            href="#"
                            title=""
                            className="text-sm font-semibold text-gray-400 hover:underline"
                          >
                            Forgot password?
                          </a>
                        </div>
                        <div className="mt-2">
                          <input
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-gray-400"
                            type="password"
                            placeholder="Password"
                            value={values.password}
                            name="password"
                            onChange={handleChange}
                          />
                        </div>
                        <p className="text-sm text-red-600 font-semibold">
                          {errors.password && touched.password && errors.password}
                        </p>
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                        >
                          Get started
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
                            className="mt-1 ml-1"
                          >
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
export default Signin;
