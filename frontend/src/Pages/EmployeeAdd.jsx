import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
const EmployeeForm = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [category, setCategory] = useState("");
  const [salary, setSalary] = useState("");
  const navigate = useNavigate();

  const [department, setDepartmet] = useState([]);
  useEffect(() => {
    getCategory();
  }, []);

  async function getCategory() {
    const response = await axios.get("/api/category");

    setDepartmet(response.data);
  }
  // console.log(department);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/users", {
        e_id: employeeId,
        e_name: name,
        age: age,
        category: category,
        salary: salary,
      })
      .then((res) => {
        // setTotal((prev) => prev + 1);
        // setUsers((prev) => [...prev, res.data]);
        // console.log(res.data);
      });
    setEmployeeId("");
    setName("");
    setAge("");
    setCategory("");
    setSalary("");
    // Send employeeData to API here
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
      <div className="max-w-lg mx-auto bg-white p-2 rounded shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">Add Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Employee ID */}
          <div>
            <label className="block mb-1 font-medium">Employee ID</label>
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
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
              // defaultValue=""
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="" className="text-gray-500" hidden>
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
            className="w-full mt-4 bg-teal-700 text-white py-2 rounded hover:bg-teal-800 transition"
          >
            Save Employee
          </button>
        </form>
      </div>
    </>
  );
};

export default EmployeeForm;
