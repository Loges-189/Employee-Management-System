import Sidebar from "../Components/sideBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex">
      <aside className="fixed left-0 top-0 w-64 h-screen bg-teal-600 text-white">
        <nav className="p-4 space-y-2">
          <NavLink
            to="/dashboard"
            className="block px-4 py-2 rounded hover:bg-teal-700"
          >
            Dashboard
          </NavLink>
        </nav>
      </aside>
      <main className="ml-64 p-6 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
