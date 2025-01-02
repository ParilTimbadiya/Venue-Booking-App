import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { privateApi } from "../utils/api";
import { useNavigate } from "react-router-dom";

const BookVenueForm = ({ venueId, onBack }) => {
  const navigate = useNavigate();

  const validationSchema = yup.object({
    booking_date: yup.date().required("Booking date is required"),
    start_time: yup.string().required("Start time is required"),
    end_time: yup.string().required("End time is required")
  });

  const formik = useFormik({
    initialValues: {
      booking_date: "",
      start_time: "",
      end_time: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const userId = localStorage.getItem("userId");
        // Format the date and times
        const bookingData = {
          user_id: userId,
          venue_id: venueId,
          booking_date: new Date(values.booking_date).toISOString().split('T')[0],
          start_time: values.start_time,
          end_time: values.end_time
        };

        const response = await privateApi.post("/bookings", bookingData);
        if (response.status === 200) {
          navigate("/bookings");
        }
      } catch (error) {
        console.error("Booking failed:", error);
      }
    }
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Book Venue</h2>
        <button
          onClick={onBack}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          Back
        </button>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Booking Date
          </label>
          <input
            type="date"
            name="booking_date"
            value={formik.values.booking_date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          {formik.touched.booking_date && formik.errors.booking_date && (
            <div className="text-red-500 text-sm">{formik.errors.booking_date}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Start Time
          </label>
          <input
            type="time"
            name="start_time"
            value={formik.values.start_time}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          {formik.touched.start_time && formik.errors.start_time && (
            <div className="text-red-500 text-sm">{formik.errors.start_time}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            End Time
          </label>
          <input
            type="time"
            name="end_time"
            value={formik.values.end_time}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          {formik.touched.end_time && formik.errors.end_time && (
            <div className="text-red-500 text-sm">{formik.errors.end_time}</div>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookVenueForm;
