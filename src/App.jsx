import React from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/layouts/Header";
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import Welcome from "./pages/Welcome";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;
