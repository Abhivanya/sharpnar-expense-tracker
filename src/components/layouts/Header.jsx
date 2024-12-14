import React, { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { logoutAction } from "../../store/authActions";
import { useDispatch, useSelector } from "react-redux";
import { premiumActions } from "../../store/premiumSlice";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const totalExpenses = useSelector((state) => state.expense.totalExpenses);
  const isPremiumUser = useSelector((state) => state.premium.isPremium);
  const theme = useSelector((state) => state.premium.theme);

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
      alert("Expense is Less than 10000");
    }
  };
  useEffect(() => {
    if (totalExpenses < 10000) {
      dispatch(premiumActions.dactivatePremium());
    }
  }, [totalExpenses]);

  const handleThemChange = () => {
    dispatch(premiumActions.toggleTheme());
  };

  return (
    <header className="flex w-full justify-between  items-center p-7 text-black">
      {isLoggedIn && (
        <Link to={"/"} className="text-2xl font-bold underline text-red-500">
          Welcome to Expnese Tracker!
        </Link>
      )}
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
        {isLoggedIn && isPremiumUser && (
          <>
            <button
              className={`${
                theme === "dark"
                  ? "text-black border-2 border-white bg-white"
                  : "text-white border-white bg-black"
              } rounded-md font-bold  px-2 py-1 text-[16px] w-[80px] flex items-center justify-center gap-1`}
              onClick={handleThemChange}
            >
              {console.log(theme)}
              {theme === "dark" ? (
                <>
                  <CiLight />
                  Light
                </>
              ) : (
                <>
                  <MdDarkMode />
                  Dark
                </>
              )}
            </button>
          </>
        )}

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
