import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ShowEmployee = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data.users);
    } catch (err) {
      console.error(err);
    }
  }

  const handleDelete = async (id) => {
    if (confirm("Are You Sure Want To Delete...")) {
      try {
        await axios.delete(`/api/users/${id}`);
        toast.success("Employee Deleted Successfully");
        getUsers();
      } catch (err) {
        alert("Failed to delete user");
      }
    }
  };

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Employees List</h2>

        <NavLink
          to="/dashboard/addemployee"
          className="bg-teal-600 text-white px-5 py-2 rounded-lg shadow hover:bg-teal-700 transition text-center"
        >
          + Add Employee
        </NavLink>
      </div>

      {/* ===== DESKTOP TABLE ===== */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full border-collapse">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Age</th>
              <th className="px-6 py-4 text-center">Category</th>
              <th className="px-6 py-4 text-center">Salary</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.e_id}
                  className="border-b last:border-none hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{user.e_id}</td>
                  <td className="px-6 py-4 font-medium">{user.e_name}</td>
                  <td className="px-6 py-4">{user.age}</td>
                  <td className="px-6 py-4 text-center">{user.category}</td>
                  <td className="px-6 py-4 text-center">{user.salary}</td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      onClick={() => handleDelete(user.e_id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/dashboard/employee/edit/${user.e_id}`)
                      }
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===== MOBILE CARDS ===== */}
      <div className="md:hidden space-y-4">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user.e_id}
              className="bg-white rounded-xl shadow p-4 space-y-2"
            >
              <div className="flex justify-between">
                <span className="font-semibold">{user.e_name}</span>
                <span className="text-sm text-gray-500">ID: {user.e_id}</span>
              </div>

              <div className="text-sm text-gray-600">Age: {user.age}</div>
              <div className="text-sm text-gray-600">
                Department: {user.category}
              </div>
              <div className="text-sm text-gray-600">Salary: {user.salary}</div>

              <div className="flex gap-2 pt-3">
                <button
                  onClick={() => handleDelete(user.e_id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 cursor-pointer"
                >
                  Delete
                </button>
                <button
                  onClick={() =>
                    navigate(`/dashboard/employee/edit/${user.e_id}`)
                  }
                  className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 cursor-pointer"
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-6">
            No employees found
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowEmployee;
