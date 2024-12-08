import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex w-full justify-between  items-center p-7 text-black">
      <div>Welcome to Expnese Tracker!</div>
      <div>
        Your Profile is Incomplete{" "}
        <NavLink to="/profile" className="underline px-1 pointer text-blue-600">
          Complete now
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
