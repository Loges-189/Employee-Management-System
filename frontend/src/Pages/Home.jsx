import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCity, faUsers, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
/* ---------- Reusable Stat Card ---------- */
const StatCard = ({ title, value, icon }) => (
  <div className="w-full sm:w-72 bg-white shadow-xl rounded-2xl p-6 flex flex-col items-center">
    <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
      <FontAwesomeIcon icon={icon} />
      {title}
    </h2>
    <p className="text-3xl font-bold mt-4">{value}</p>
  </div>
);

const Home = () => {
  /* ---------- States ---------- */
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalSalary: 0,
    totalCategory: 0,
  });
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState("");
  const [employees, setEmployees] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  /* ---------- Fetch Dashboard Stats ---------- */
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [empRes, salaryRes, categoryRes] = await Promise.all([
        axios.get("/api/users/totalemployee"),
        axios.get("/api/users/totalsalary"),
        axios.get("/api/category/totalcategory"),
      ]);

      setStats({
        totalEmployees: empRes.data.totalEmployees,
        totalSalary: salaryRes.data.totalSalary,
        totalCategory: categoryRes.data.totalCategory,
      });
    } catch (error) {
      console.error("Error loading dashboard stats", error);
    }
  };

  /* ---------- Search Employee ---------- */
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchId.trim()) return alert("Employee ID is required");

    try {
      setLoading(true);
      const res = await axios.get(`/api/users/${searchId}`);
      setEmployees(res.data);
      setShowResult(true);
    } catch (error) {
      setEmployees([]);
      setShowResult(true);
    } finally {
      setLoading(false);
      setSearchId("");
    }
  };

  const handleCancel = () => {
    setShowResult(false);
    setEmployees([]);
  };

  const handleDelete = async (id) => {
    try {
      // console.log(id);

      const res = await axios.delete(`/api/users/${id}`);
      // console.log(res);
      toast.success("Employee Deleted Successfully");
      setShowResult(false);
      // getUsers();
    } catch (err) {
      alert("Failed to delete user");
    }
  };
  /* ---------- UI ---------- */
  return (
    <>
      <h1 className="text-center pt-6 font-bold text-2xl">DASHBOARD</h1>

      <div className="w-full min-h-screen p-4 md:p-10 space-y-12">
        {/* ---------- Dashboard Cards ---------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          <StatCard
            title="Total Departments"
            value={stats.totalCategory}
            icon={faCity}
          />
          <StatCard
            title="Total Employees"
            value={stats.totalEmployees}
            icon={faUsers}
          />
          <StatCard
            title="Total Salary"
            value={
              stats.totalSalary !== null ? `₹ ${stats.totalSalary}` : "₹ 0"
            }
          />
        </div>

        {/* ---------- Search ---------- */}
        <form
          onSubmit={handleSearch}
          className="flex items-center justify-center gap-2 w-full"
        >
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Employee ID"
            className="
      flex-1 max-w-xs sm:max-w-sm md:max-w-md
      px-4 py-2 border rounded-l-lg
      focus:outline-none focus:outline-orange-400
    "
            required
          />

          <button
            type="submit"
            className="
      bg-orange-600 px-6 py-2 text-white
      rounded-r-lg hover:bg-orange-700 transition
      whitespace-nowrap
    "
          >
            Search
          </button>
        </form>

        {/* ---------- RESULTS ---------- */}
        {showResult && (
          <>
            {/* ===== Desktop Table ===== */}
            <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-teal-600 text-white">
                  <tr>
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Age</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Salary</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="p-6 text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : employees.length > 0 ? (
                    employees.map((emp) => (
                      <tr key={emp.e_id} className="text-center">
                        <td className="px-6 py-4">{emp.e_id}</td>
                        <td className="px-6 py-4">{emp.e_name}</td>
                        <td className="px-6 py-4">{emp.age}</td>
                        <td className="px-6 py-4">{emp.category}</td>
                        <td className="px-6 py-4">{emp.salary}</td>
                        <td className="px-6 py-4 space-x-2">
                          <button
                            onClick={() => handleDelete(emp.e_id)}
                            className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() =>
                              navigate(`/dashboard/employee/edit/${emp.e_id}`)
                            }
                            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="hidden md:table-row">
                      <td colSpan="6" className="p-6 text-center text-gray-500">
                        No Employee Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* ===== Mobile Cards ===== */}
            <div className="md:hidden space-y-4">
              {employees.map((emp) => (
                <div key={emp.e_id} className="bg-white shadow rounded-xl p-4">
                  <h3 className="font-bold text-lg">{emp.e_name}</h3>
                  <p>ID: {emp.e_id}</p>
                  <p>Age: {emp.age}</p>
                  <p>Category: {emp.category}</p>
                  <p>Salary: {emp.salary}</p>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="flex-1 bg-red-500 text-white py-2 rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/dashboard/employee/edit/${emp.e_id}`)
                      }
                      className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ---------- MODAL ---------- */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative">
            <FontAwesomeIcon
              icon={faXmark}
              className="absolute top-4 right-4 text-2xl cursor-pointer"
              onClick={() => setShowDetails(false)}
            />

            <h2 className="text-2xl font-bold text-center mb-6">
              EMPLOYEE DETAILS
            </h2>

            {employees.map((emp) => (
              <div key={emp.e_id} className="space-y-3 text-lg">
                <p>
                  <b>ID:</b> {emp.e_id}
                </p>
                <p>
                  <b>Name:</b> {emp.e_name}
                </p>
                <p>
                  <b>Age:</b> {emp.age}
                </p>
                <p>
                  <b>Category:</b> {emp.category}
                </p>
                <p>
                  <b>Salary:</b> {emp.salary}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
