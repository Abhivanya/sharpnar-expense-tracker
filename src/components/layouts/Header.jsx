import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { logoutAction } from "../../store/authActions";
import { useDispatch, useSelector } from "react-redux";
import { premiumActions } from "../../store/premiumSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const totalExpenses = useSelector((state) => state.expense.totalExpenses);
  const isPremiumUser = useSelector((state) => state.premium.isPremium);

  const handleLogout = () => {
    dispatch(logoutAction());
    if (!isLoggedIn) {
      navigate("/login");
    }
  };

  const handleActivatePremium = () => {
    if (totalExpenses > 10000) {
      if (!isPremiumUser) {
        dispatch(premiumActions.activatePremium());
      }
    } else {
      dispatch(premiumActions.dactivatePremium());
      alert("Expense is Less than 10000");
    }
  };
  return (
    <header className="flex w-full justify-between  items-center p-7 text-black">
      <div>Welcome to Expnese Tracker!</div>
      <div className="flex justify-evenly items-center gap-3">
        {isLoggedIn &&
          (isPremiumUser ? (
            <button className="text-yellow-500 border-2 border-yellow-500 rounded-md font-bold bg-black px-2 py-1 text-[16px]">
              Premium User
            </button>
          ) : (
            <button
              className="text-yellow-500 border-2 border-yellow-500 rounded-md font-bold bg-black px-2 py-1 text-[16px]"
              onClick={handleActivatePremium}
            >
              Activate Premium
            </button>
          ))}
        {isLoggedIn &&
          (isPremiumUser ? (
            <>
              <button
                className="text-white border-2 border-white rounded-md font-bold bg-black px-2 py-1 text-[16px]"
                onClick={handleActivatePremium}
              >
                Dark
              </button>
            </>
          ) : (
            <div>
              Your Profile is Incomplete{" "}
              <NavLink
                to="/profile"
                className="underline px-1 pointer text-blue-600"
              >
                Complete now
              </NavLink>
            </div>
          ))}

        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-3 py-1 rounded-md hover:text-red-500 hover:bg-yellow-100"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
