import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { IoSettings, IoCloseCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      if (!userInfo) {
        alert("You must be logged in to view this page");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5151/api/users`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleDelete = async (id) => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (!userInfo) {
      console.error("User not logged in");
      return;
    }

    try {
      await axios.delete(`http://localhost:5151/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error(
        "Error deleting user:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setRole(user.role);
    setStatus(user.status);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (!userInfo) return;

    try {
      const response = await axios.put(
        `http://localhost:5151/api/users/${editingUser._id}`,
        {
          role,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setUsers(
        users.map((user) =>
          user._id === editingUser._id ? response.data : user
        )
      );
      setEditingUser(null);
    } catch (error) {
      console.error(
        "Error updating user:",
        error.response ? error.response.data : error.message
      );
    }
  };

  //Logout Function
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="text-center p-5">
      <button
        className="block ml-auto btn bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded"
        onClick={handleLogout}
      >
        logout
      </button>
      <h1 className="text-2xl mb-4">User Table</h1>
      <table className="min-w-full mx-auto mt-10">
        <thead>
          <tr className="border-b">
            <th className="p-4">#</th>
            <th className="p-4">Name</th>
            <th className="p-4">Date Created</th>
            <th className="p-4">Role</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className="border-b">
              <td className="p-3">{index + 1}</td>
              <td className="p-3 flex items-center gap-5">
                <div className="pl-20">
                  {/* Image */}
                  <div className="flex-shrink-0">
                    {user?.photo ? (
                      <img
                        className="w-11 h-11 rounded-full"
                        src={user?.photo}
                        alt="User Avatar"
                      />
                    ) : (
                      <FaUserCircle size={44} />
                    )}
                  </div>
                  {/* Name */}
                </div>
                <p>{user.name}</p>
              </td>
              <td className="p-3">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="p-3">{user.role}</td>
              <td className="p-3 ">
                <span
                  className={`inline-block w-3 h-3 mr-2 rounded-full  ${
                    user.status === "active"
                      ? "bg-green-500"
                      : user.status === "suspend"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                ></span>
                {user.status}
              </td>
              <td className="p-3 flex justify-center gap-5">
                <button
                  onClick={() => handleEdit(user)}
                  className="text-blue-500"
                >
                  <IoSettings size={25} />
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-red-500"
                >
                  <IoCloseCircle size={25} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <div className="fixed bg-slate-500 bg-opacity-25 inset-0 flex justify-center items-center">
          <form
            onSubmit={handleUpdate}
            className="mt-4 bg-white p-10 rounded flex flex-col gap-4"
          >
            <h2 className="text-xl">Edit User</h2>
            <div>
              <label className="flex gap-5 w-full">
                Role:
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="border rounded ml-2"
                >
                  <option value="admin">Admin</option>
                  <option value="publisher">Publisher</option>
                  <option value="moderator">Moderator</option>
                </select>
              </label>
            </div>
            <div>
              <label className="flex gap-5 w-full">
                Status:
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="border rounded ml-2"
                >
                  <option value="active">Active</option>
                  <option value="suspend">Suspend</option>
                  <option value="inactive">Inactive</option>
                </select>
              </label>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white py-1 rounded w-full"
            >
              Update User
            </button>
            <button
              type="button"
              onClick={() => setEditingUser(null)}
              className="bg-gray-500 hover:bg-slate-700 text-white py-1 rounded w-full"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserTable;
