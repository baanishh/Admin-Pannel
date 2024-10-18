import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { PiUserCircleLight } from "react-icons/pi";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5151/api/login`,
        credentials
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      toast.success("Logged in Successfully");
      navigate("/table");
    } catch (error) {
      toast.error("User not Found");
      console.error("Error:", error);
    }
  };

  return (
    <div
      className="flex items-center justify-center  w-full h-screen "
      style={{
        backgroundImage: "linear-gradient(to bottom, #0599a0 0%, #0599a0 100%)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-6 bg-[#1c2c50] shadow-lg rounded-lg w-full max-w-md mx-auto relative"
      >
        <div className="flex items-center justify-center -mt-10 ">
          <p className="bg-cyan-500 w-fit px-10 py-4 text-xl text-white shadow-md rounded pointer-events-none">
            SIGN IN
          </p>
        </div>

        {/* Photo Upload Section */}
        <div className="flex flex-col gap-2 mb-4 items-center justify-center mt-8">
          <label htmlFor="profile_pic" className="text-gray-700 font-medium">
            <div className="relative w-24 h-24 rounded-full border-gray-300 mb-4 flex items-center justify-center overflow-hidden cursor-pointer">
              <span className="text-sm text-gray-500">
                <PiUserCircleLight size={120} />
              </span>
            </div>
          </label>
        </div>

        {/* Email Input */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 mb-4 border-r pr-2">
            <MdEmail size={20} className="text-gray-500" />
          </span>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="mb-4 p-2 pl-12 text-white rounded bg-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full"
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 mb-4 border-r pr-2">
            <IoMdLock size={20} className="text-gray-500" />
          </span>
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="mb-4 p-2 pl-12 text-white rounded bg-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full"
          />
        </div>

        <p className="my-3 text-center text-white">
          New User ?{" "}
          <Link to={"/register"} className="hover:text-primary font-semibold">
            Register
          </Link>
        </p>
        <button
          type="submit"
          className="bg-cyan-500  text-white py-2 rounded-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
