import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
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
  );
};

export default Sidebar;
