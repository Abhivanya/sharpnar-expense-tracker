import React, { useRef } from "react";
import Style from "./Signup.module.css";
import { useDispatch, useSelector } from "react-redux";
import { singupAction } from "../store/authActions";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  const handleSignup = (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      alert("Password Did not match");
      return;
    }
    dispatch(
      singupAction(emailRef.current.value, confirmPasswordRef.current.value)
    );
    if (isLoggedIn) {
      navigate("/");
    }
    e.target.reset();
  };
  return (
    <div className={Style.container}>
      <form onSubmit={handleSignup}>
        <h1>SignUp</h1>
        <div className={Style.inputContainer}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" ref={emailRef} required />
        </div>
        <div className={Style.inputContainer}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            minLength={"6"}
            ref={passwordRef}
          />
        </div>
        <div className={Style.inputContainer}>
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            name="cpassword"
            id="cpassword"
            required
            ref={confirmPasswordRef}
            minLength={"6"}
          />
        </div>
        <button>Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
