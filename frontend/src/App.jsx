import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import ShowEmployee from "./Pages/ShowEmployee";
import EmployeeAdd from "./Pages/EmployeeAdd";
import Category from "./Pages/Category";
import EditEmployee from "./Pages/EditEmployee";
import AddCategory from "./Pages/AddCategory";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="employee" element={<ShowEmployee />} />
          <Route path="addemployee" element={<EmployeeAdd />} />
          <Route path="category" element={<Category />} />
          <Route path="category/addcategory" element={<AddCategory />} />
          <Route path="employee/edit/:id" element={<EditEmployee />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
