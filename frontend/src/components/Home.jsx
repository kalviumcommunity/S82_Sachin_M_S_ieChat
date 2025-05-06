import React from "react";
import { useUser } from "../context/UserContext";

function Home() {
  const { user, loading, logout } = useUser();

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-[#2f3136] text-white text-lg">
        Loading user...
      </div>
    );

  if (!user)
    return (
      <div className="flex items-center justify-center h-screen bg-[#2f3136] text-white text-lg">
        Please <a href="/login" className="text-blue-400 underline mx-1">login</a> to see your dashboard.
      </div>
    );

  return (
    <div className="min-h-screen bg-[#2f3136] text-white flex items-center justify-center p-6">
      <div className="bg-[#36393f] p-8 rounded-xl shadow-lg w-full max-w-md space-y-4 text-center">
        <h2 className="text-2xl font-bold">👋 Welcome, {user.username}!</h2>
        <p className="text-gray-400">You are now logged in.</p>

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
