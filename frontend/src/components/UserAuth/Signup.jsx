import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {

      await axios.post("http://localhost:5000/api/auth/signup",{username,email,password},{
        withCredentials:true
      })
      toast.success("Signup successful!");
      window.location.href = "/"
    } catch (err) {
      toast.error("Something went wrong, please try again.");
    }
  };

  return (
    <form
      className="space-y-5 max-w-lg mx-auto bg-[#2f3136] p-8 rounded-xl shadow-lg text-white"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        Create an account
      </h2>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Username
        </label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-[#202225] text-white border border-[#202225] rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5865F2] transition"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-[#202225] text-white border border-[#202225] rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5865F2] transition"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-[#202225] text-white border border-[#202225] rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5865F2] transition"
        />
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full bg-[#202225] text-white border border-[#202225] rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5865F2] transition"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#5865F2] text-white font-semibold py-3 px-4 rounded-md hover:bg-[#4752c4] transition"
      >
        Continue
      </button>

      <p className="text-sm text-gray-400 text-center mt-3">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-[#5865F2] hover:underline font-medium"
        >
          Log in
        </a>
      </p>
    </form>
  );
};

export default Signup;
