import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const Category = () => {
  const [category, setCategory] = useState("");
  useEffect(() => {
    getCategory();
  }, []);

  async function getCategory() {
    const response = await axios.get("/api/category");
    setCategory(response.data);
    // console.log(category);
  }

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await axios.delete(`/api/category/${id}`);
      // Refetch all users
      getCategory();
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center m-6">
        <NavLink
          to="/dashboard/category/addcategory"
          className="bg-teal-600 text-white px-6 py-2 rounded-lg shadow hover:bg-teal-700 transition"
        >
          + Add Category
        </NavLink>
      </div>
      <div className="flex justify-center items-start min-h-screen p-6 ">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-teal-600 text-white text-center py-4 text-lg font-semibold">
            Category List
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                {category.length > 0 ? (
                  category.map((user, index) => (
                    <tr
                      key={index}
                      className="border-b last:border-none hover:bg-teal-50 transition duration-200"
                    >
                      <td className="px-10 py-4 text-center font-medium text-gray-700">
                        {user.c_name}
                      </td>
                      <td>
                        <button
                          className="cursor-pointer"
                          onClick={() => handleDelete(user.c_id)}
                        >
                          <FontAwesomeIcon
                            className="text-lg text-gray-700 md:pr-0 pr-3"
                            icon={faTrash}
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-6 py-6 text-center text-gray-500">
                      No Category found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
