import React, { useEffect } from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/layouts/Header";
import { Route, Routes, Navigate } from "react-router-dom";
import Profile from "./pages/Profile";
import Welcome from "./pages/Welcome";
import EmailVerification from "./pages/EmailVerification";
import Greeting from "./testing/Greeting";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/authSlice";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const theme = useSelector((state) => state.premium.theme);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (token && email) {
      dispatch(authActions.checkLoggedIn({ token: token, email: email }));
    }
  }, []);
  return (
    <div className={`${theme === "dark" ? "dark" : ""}`}>
      <Header />
      <Routes>
        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/"
          element={isLoggedIn ? <Welcome /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/signup"
          element={!isLoggedIn ? <Signup /> : <Navigate to="/" replace />}
        />
        {isLoggedIn && <Route path="/profile" element={<Profile />} />}
        {isLoggedIn && (
          <Route path="/verifyEmail" element={<EmailVerification />} />
        )}
      </Routes>
    </div>
  );
};

export default App;
