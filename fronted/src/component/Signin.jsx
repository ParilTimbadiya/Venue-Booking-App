import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import {publicApi} from "../utils/api";
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
        .min(8, "**password length must be atlest 8")
        .required("**Password is required"),
    }),
    onSubmit: async (loginData) => {
      console.log("Logging in with data:", loginData); // Log the login data
      try {
        const data = await publicApi.post("/signin", loginData);
        console.log(data);
        if (data.status == 200) {
          console.log(data.data.message);
          localStorage.setItem("auth", data.data.message);
          localStorage.setItem("role",data.data.role);
          navigate("/");
          window.location.reload();
        }
        else if(data.status == 403) {
          alert("Invalid credentials");
        }
        else if(data.status == 500){
          alert("Internal server error");
        }else{
          alert("Invalid credentials");
        }
      } catch (ex) {
        console.log(ex);
      }
    },
  });
  return (
    <>
      <div className=" w-screen h-screen bg-[#152331]">
        <div className="w-[500px] h-[600px] bg-[#152331] absolute mt-16 ml-[550px] rounded-xl">
          <div>
            <section className="rounded-md ">
              <div className="flex items-center justify-center ">
                <div className=" ">
                  <div className=" w-full items-center  mt-5 mb-3">
                    <h2 className="text-xl font-bold leading-tight text-gray-300 text-center ">
                      Sign in to your account
                    </h2>
                    <div className="flex text-center mt-2">
                      <h6 className="text-[#53abf3]  ml-[50px] mr-1">
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
                          {errors.password &&
                            touched.password &&
                            errors.password}
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
                            // class="ml-2"
                            className="mt-1 ml-1"
                          >
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </form>
                  {/* <div className="mt-4 space-y-4 ">
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
                      Sign in with Google
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
                      Sign in with Facebook
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
export default Signin;

