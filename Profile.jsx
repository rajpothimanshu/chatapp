import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Chat/Nav";
import { useProfile } from "../context/profileContext"
import SelectAvatar from "./SelectAvatar";

const Profile = () => {
  const { userDetails } = useProfile();
  const [formData, setFormData] = useState({});
  const [selectedLink, setSelectedLink] = useState("");

  // Update form data when input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit updated profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/api/user/profile/update", {
        ...formData,
        avatarLink: selectedLink,
      });
      // Optionally, update context or show a success message
      console.log("Profile updated:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Initialize form data with user details
  useEffect(() => {
    if (userDetails) setFormData(userDetails);
  }, [userDetails]);

  return (
    <div className="flex h-full min-h-screen bg-background">
      <Nav />
      <div className="bg-background w-[91%] flex items-center justify-center">
        <div className="max-w-xl w-full mx-auto p-6">
          <h2 className="mb-6 text-2xl font-bold text-white">Update Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* First Name */}
              <div className="w-full">
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formData?.firstName || ""}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Last Name */}
              <div className="w-full">
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formData?.lastName || ""}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Email (read-only) */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={userDetails?.email || ""}
                  disabled
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm bg-gray-700 text-gray-300 cursor-not-allowed"
                  required
                />
              </div>
            </div>

            {/* Avatar Selection */}
            <SelectAvatar
              setSelectedLink={setSelectedLink}
              selectedLink={selectedLink}
            />

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
