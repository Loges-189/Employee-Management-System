import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const EditEmployee = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [category, setCategory] = useState("");
  const [salary, setSalary] = useState("");
  const [department, setDepartmet] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getCategory();
  }, []);

  async function getCategory() {
    const response = await axios.get("/api/category");

    setDepartmet(response.data);
  }
  useEffect(() => {
    if (!id) return;
    axios
      .get(`/api/users/${id}`)
      .then((res) => {
        const data = res.data[0];
        // console.log(data);

        setEmployeeId(data.e_id || "");
        setName(data.e_name || "");
        setAge(data.age || "");
        setCategory(data.category || "");
        setSalary(data.salary || "");
      })
      .catch((err) => {
        console.error("Error fetching employee:", err);
      });
  }, [id]);
  // console.log(category);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedEmployee = {
      e_id: employeeId,
      e_name: name,
      age,
      category,
      salary,
    };

    axios
      .put(`/api/users/${id}`, updatedEmployee)
      .then(() => {
        navigate("/dashboard/employee");
      })
      .catch((err) => {
        console.error("Error updating employee:", err);
      });
    setEmployeeId("");
    setName("");
    setAge("");
    setCategory("");
    setSalary("");
    toast.success("Employee Updated Successfully");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => navigate("/dashboard/employee")}
        className=" text-teal-700 font-medium hover:underline p-2 md:px-10 md:pt-5  cursor-pointer md:mt-6"
      >
        ← Back to Employee List
      </button>

      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Edit Employee
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Employee ID */}
          <div>
            <label className="block mb-1 font-medium">Employee ID</label>
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
              autoFocus
            />
          </div>

          {/* Employee Name */}
          <div>
            <label className="block mb-1 font-medium">Employee Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          {/* Employee Age */}
          <div>
            <label className="block mb-1 font-medium">Employee Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="" className="text-gray-700" disabled>
                Select Category
              </option>
              {department.map((dep, index) => (
                <option key={index} value={dep.c_name}>
                  {dep.c_name}
                </option>
              ))}
            </select>
          </div>

          {/* Employee Salary */}
          <div>
            <label className="block mb-1 font-medium">Employee Salary</label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-teal-700 text-white py-2 rounded hover:bg-teal-800 transition"
          >
            Save Employee
          </button>
        </form>
      </div>
    </>
  );
};

export default EditEmployee;
