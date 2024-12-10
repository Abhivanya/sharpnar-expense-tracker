import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <header className="flex w-full justify-between  items-center p-7 text-black">
      <div>Welcome to Expnese Tracker!</div>
      <div className="flex justify-evenly items-center gap-3">
        <button className="text-yellow-500 border-2 border-yellow-500 rounded-md font-bold bg-black px-2 py-1 text-[16px]">
          Activate Premium
        </button>
        <div>
          Your Profile is Incomplete{" "}
          <NavLink
            to="/profile"
            className="underline px-1 pointer text-blue-600"
          >
            Complete now
          </NavLink>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-3 py-1 rounded-md hover:text-red-500 hover:bg-yellow-100"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
