import React from "react";

export default function EditProfile() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      {/* Top Navigation */}
      <div className="w-full bg-white shadow-sm p-4 flex justify-between items-center px-10">
        <h2 className="text-lg font-semibold">UI Design Daily</h2>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-black">Upload</button>
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="w-10 h-10 rounded-full border"
          />
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 mt-6">
        <h3 className="text-xl font-bold mb-6">Settings</h3>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-1">
            <ul className="space-y-4 text-gray-600">
              <li className="font-semibold text-black">Public Profile</li>
              <li>Account Settings</li>
              <li>Notifications</li>
              <li>PRO Account</li>
            </ul>
          </div>

          {/* Profile Form */}
          <div className="col-span-2 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Public Profile</h3>

            {/* Profile Picture */}
            <div className="flex items-center space-x-4">
              <img
                src="https://via.placeholder.com/80"
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border"
              />
              <div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
                  Change Picture
                </button>
                <button className="ml-2 border px-4 py-2 rounded-md">
                  Delete Picture
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full p-3 border rounded-md"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full p-3 border rounded-md"
                />
              </div>

              <input
                type="email"
                placeholder="Location (email@example.com)"
                className="w-full p-3 border rounded-md"
              />

              <input
                type="text"
                placeholder="Profession"
                className="w-full p-3 border rounded-md"
              />

              <textarea
                placeholder="Bio"
                className="w-full p-3 border rounded-md"
                rows="3"
              ></textarea>

              <button className="w-full bg-black text-white py-3 rounded-md mt-4">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}