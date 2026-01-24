import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const AddCategory = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(category);
    axios.post("/api/category", {
      c_name: category,
    });
    // .then((res) => console.log(res.data));

    setCategory("");
  };
  return (
    <>
      <button
        type="button"
        onClick={() => navigate("/dashboard/category")}
        className=" text-teal-700 font-medium hover:underline p-2 md:px-10 md:pt-5  cursor-pointer md:mt-6"
      >
        ← Back to Category List
      </button>

      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">Add Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mt-7 mb-2 font-medium">
              Enter Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-700 text-white py-2 rounded hover:bg-teal-800 transition mt-6"
          >
            Save Category
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCategory;
