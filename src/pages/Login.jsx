import React, { useRef } from "react";
import Style from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../store/authActions";
const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!emailRef.current.value || !passwordRef.current.value) {
      alert("Fill all details");
      return;
    }
    dispatch(loginAction(emailRef.current.value, passwordRef.current.value));
    console.log(isLoggedIn);
    if (isLoggedIn) {
      navigate("/");
    }
  };

  const handleForget = () => {
    const enterdEmail = prompt("Enter your email");
    if (!enterdEmail) return;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDDTATv0YiM4tUTMW_am_sGPbArW4ZmUOk",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: enterdEmail,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.err) {
          throw new Error(res.error);
        }
        console.log(res);

        alert("Passwerd reset Link is set To your Email");
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };
  return (
    <div className={Style.container}>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
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

        <button onClick={handleLogin}>Login </button>
        <Link className="underline text-blue-400" to={"/signup"}>
          Create account ?
        </Link>
      </form>
      <div
        className="underline text-center cursor-pointer"
        onClick={handleForget}
      >
        Forget Password ?
      </div>
    </div>
  );
};

export default Login;
