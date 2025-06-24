import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post("https://s82-sachin-m-s-iechat.onrender.com/api/auth/login",{email,password},{
        withCredentials:true,
      })
      console.log(resp.data)
      toast.success("Logged In!")
      window.location.href = "/"
      
    } catch (e) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <form
      method="post"
      className="space-y-5 max-w-lg mx-auto bg-[#2f3136] p-8 rounded-xl shadow-lg text-white mt-12"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        Welcome back!
      </h2>

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

      <div className="text-right">
        <Link to="/forgot-password" className="text-sm text-[#5865F2] hover:underline">
          Forgot your password?
        </Link>
      </div>

      <button
        type="submit"
        className="w-full bg-[#5865F2] text-white font-semibold py-3 px-4 rounded-md hover:bg-[#4752c4] transition"
      >
        Login
      </button>

      <p className="text-sm text-gray-400 text-center mt-4">
        Need an account?{" "}
        <Link to="/signup" className="text-[#5865F2] hover:underline font-medium">
          Signup
        </Link>
      </p>
    </form>
  );
};

export default Login;
