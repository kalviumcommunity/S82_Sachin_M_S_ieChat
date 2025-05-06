import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import axios from "axios";

function Home() {
  const { user, loading, logout } = useUser();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      setUploading(true);
      const res = await axios.put(
        "http://localhost:5000/api/auth/update-profile-pic",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      window.location.reload(); // Force refresh to show new profile pic
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-[#2f3136] text-white text-lg">
        Loading user...
      </div>
    );

  if (!user)
    return (
      <div className="flex items-center justify-center h-screen bg-[#2f3136] text-white text-lg">
        Please{" "}
        <a href="/login" className="text-blue-400 underline mx-1">
          login
        </a>{" "}
        to see your dashboard.
      </div>
    );

  return (
    <div className="min-h-screen bg-[#2f3136] text-white flex items-center justify-center p-6">
      <div className="bg-[#36393f] p-8 rounded-xl shadow-lg w-full max-w-md space-y-4 text-center">
        <h2 className="text-2xl font-bold">👋 Welcome, {user.username}!</h2>
        {user.profilePic && (
          <img
            src={`http://localhost:5000${user.profilePic}`}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto border border-gray-500"
          />
        )}
        <p className="text-gray-400">You are now logged in.</p>

        <div className="space-y-2">
          <input
            type="file"
            onChange={handleFileChange}
            className="text-sm text-gray-300 file:bg-blue-600 file:text-white file:px-3 file:py-1 file:rounded file:border-0 file:cursor-pointer"
          />
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="block w-full bg-blue-500 hover:bg-blue-600 transition px-5 py-2 rounded-md font-medium"
          >
            {uploading ? "Uploading..." : "📸 Change Profile Picture"}
          </button>
        </div>

        <button
          onClick={logout}
          className="mt-4 bg-red-600 hover:bg-red-700 transition px-5 py-2 rounded-md font-medium text-white"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
