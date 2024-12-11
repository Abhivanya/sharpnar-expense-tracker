import React from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/layouts/Header";
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import Welcome from "./pages/Welcome";
import EmailVerification from "./pages/EmailVerification";
import ResetPassword from "./pages/ResetPassword";
import Greeting from "./testing/Greeting";

const App = () => {
  return (
    <>
      <Header />
      <Greeting />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/verifyEmail" element={<EmailVerification />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default App;
