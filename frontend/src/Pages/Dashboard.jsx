import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faBars,
  faClipboard,
  faUsers,
  faUserPlus,
  faCity,
  faTimes,
  faArrowRight,
  faArrowCircleLeft,
  faArrowRightToBracket,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  // -------------------------------------------------------COOKIE---------------------------------------------------
  // axios.defaults.withCredentials = true;
  // ----------------------------------------------------------------------------------------------------------------
  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      const res = await axios.get("/api/auth/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setName(res.data.name);
    } catch (err) {
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  // STEP 3
  // -------------------------------------------------------COOKIE---------------------------------------------------
  // useEffect(() => {
  //   axios
  //     .get("/api/auth/dashboard")
  //     .then((res) => {
  //       setName(res.data.name);
  //     })
  //     .catch(() => navigate("/login", { replace: true }));
  // }, [navigate]);

  const logout = async () => {
    // ---------------------------------------------------------COOKIE-------------------------------------------
    // const result = confirm("Are you want to logout..");
    // if (result) {
    //   navigate("/login", { replace: true });
    //   await axios.post("/api/auth/logout");
    // }
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  // ----------------------------------------------------------------------------------------------------------

  const linkClasses = ({ isActive }) =>
    `pl-7 py-3 rounded text-white font-medium transition flex items-center 
     ${
       isActive ? "bg-orange-400 border border-orange-600" : "hover:bg-teal-600"
     }`;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`
          fixed md:static z-50 md:w-1/4 bg-teal-700 h-full
          transform transition-transform duration-300 w-60
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          flex flex-col pt-10 gap-2
        `}
      >
        {/* Close button (mobile) */}
        <button
          className="absolute top-4 right-4 text-white md:hidden"
          onClick={() => setOpen(false)}
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        <h1 className="text-white font-extrabold text-2xl py-10 pl-8">
          Welcome {name} !
        </h1>
        <NavLink
          to="/dashboard"
          end
          className={linkClasses}
          onClick={() => setOpen(false)}
        >
          <FontAwesomeIcon icon={faClipboard} className="mr-3" />
          Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/employee"
          className={linkClasses}
          onClick={() => setOpen(false)}
        >
          <FontAwesomeIcon icon={faUsers} className="mr-3" />
          Employees
        </NavLink>

        <NavLink
          to="/dashboard/addemployee"
          className={linkClasses}
          onClick={() => setOpen(false)}
        >
          <FontAwesomeIcon icon={faUserPlus} className="mr-3" />
          Add Employee
        </NavLink>

        <NavLink
          to="/dashboard/category"
          className={linkClasses}
          onClick={() => setOpen(false)}
        >
          <FontAwesomeIcon icon={faCity} className="mr-3" />
          Category
        </NavLink>

        <NavLink
          to="/login"
          className="bg-orange-400 py-4 mx-5 mt-5 rounded-2xl hover:bg-orange-500 text-center"
          onClick={logout}
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} className="mr-3" />
          Logout
        </NavLink>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col flex-1 ">
        {/* Header */}
        <header className="relative flex items-center py-4 px-4 text-xl font-semibold shadow-md">
          {/* Hamburger Menu */}
          <button
            className="md:hidden absolute left-4"
            onClick={() => setOpen(true)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          {/* Centered Title */}
          <span className="mx-auto text-center text-sm md:text-2xl">
            EMPLOYEE MANAGEMENT SYSTEM
          </span>
        </header>

        {/* Outlet */}
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
