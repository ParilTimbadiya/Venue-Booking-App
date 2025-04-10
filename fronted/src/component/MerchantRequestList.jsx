import React, { useEffect, useState } from "react";
import "./Contact.css";
import { publicApi } from "../utils/api";
import { toast, ToastContainer } from "react-toastify";

const MerchantRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await publicApi.post("/merchant-requests");
        setRequests(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (email) => {
    try {
      const response = await publicApi.post(`/accept-merchant-request`, {
        email: email,
      });
      if (response.status === 200) {
        toast.success("Request accepted successfully!");
        // Refresh the list after successful action
        setRequests(requests.filter((request) => request.email !== email));
      }
    } catch (error) {
      console.error("Error accepting request:", error);
      toast.error("An error occurred while accepting the request.");
    }
  };

  const handleReject = async (email) => {
    try {
      const response = await publicApi.post(`/reject-merchant-request`, {
        email: email,
      });
      if (response.status === 200) {
        toast.success("Request rejected successfully!");
        // Refresh the list after successful action
        setRequests(requests.filter((request) => request.email !== email));
      }
    } catch (error) {
      console.error("Error rejecting request:", error);
      toast.error("An error occurred while rejecting the request.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="merchant-requests-container p-5">
      <ToastContainer position="top-right" autoClose={3000} />

      
      {requests.length>0?
        (
        <>
        <h1>Merchant Requests</h1>
      <table className="merchant-requests-table mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            requests.map((request) => (
              <tr>
                <td>{request.name}</td>
                <td>{request.email}</td>
                <td>
                  <button
                    onClick={() => handleAccept(request.email)}
                    className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition mr-3"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(request.email)}
                    className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
        </tbody></table></>):(<h2>Not have any request</h2>)
        }
      
    </div>
  );
};

export default MerchantRequestList;
