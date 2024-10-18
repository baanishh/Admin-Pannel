import { useState } from "react";
import axios from "axios";
import uploadFile from "../helpers/uploadFile";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { PiUserCircleLight } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { BsCalendar2DateFill } from "react-icons/bs";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
    photo: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const [uploadPhoto, setUploadPhoto] = useState("");

  const handleUploadphoto = async (e) => {
    const file = e.target.files[0];

    const uploadPhoto = await uploadFile(file);
    setUploadPhoto(file);
    setUser((prev) => {
      return {
        ...prev,
        photo: uploadPhoto?.url,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5151/api/register/",
        user
      );
      navigate("/login");
      toast.success("Registered Successfully");
    } catch (error) {
      toast.error("User Already Exist");
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
            SIGN UP
          </p>
        </div>

        {/* Photo Upload Section */}
        <div className="flex flex-col gap-2 mb-4 items-center justify-center mt-8">
          <label htmlFor="profile_pic" className="text-gray-700 font-medium">
            <div className="relative w-24 h-24 rounded-full border-gray-300 mb-4 flex items-center justify-center overflow-hidden cursor-pointer">
              {/* If there's an image uploaded, show preview, otherwise show the default text */}
              {uploadPhoto ? (
                <img
                  className="object-scale-down w-full h-full rounded-full"
                  src={URL.createObjectURL(uploadPhoto)}
                  alt="Preview"
                />
              ) : (
                <span className="text-sm text-gray-500">
                  <PiUserCircleLight size={120} />
                </span>
              )}
            </div>
            <p className="text-slate-500">Upload Photo</p>
          </label>
          {/* Hidden file input */}
          <input
            type="file"
            id="profile_pic"
            name="profile_pic"
            className="hidden"
            onChange={handleUploadphoto}
          />
        </div>

        {/* Name Input */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 mb-4 border-r pr-2">
            <FaUser size={20} className="text-gray-500" />
          </span>
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            className="mb-4 p-2 pl-12 text-white rounded bg-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full"
          />
        </div>

        {/* Date of Birth Input */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 mb-4 border-r pr-2">
            <BsCalendar2DateFill size={20} className="text-gray-500" />
          </span>
          <input
            name="dob"
            type="date"
            onChange={handleChange}
            required
            className="mb-4 p-2 pl-12 text-white rounded bg-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full "
          />
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
          Already have account ?{" "}
          <Link to={"/login"} className="hover:text-primary font-semibold">
            Login
          </Link>
        </p>
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-cyan-500  text-white py-2 rounded-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
