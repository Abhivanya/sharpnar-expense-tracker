import React, { useRef } from "react";
import Style from "./Login.module.css";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDDTATv0YiM4tUTMW_am_sGPbArW4ZmUOk",
      {
        method: "POST",
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        if (res.error) {
          throw new Error(res.error.message);
        }

        console.log(res);
        alert("SignIn Successfully");
        localStorage.setItem("token", res.idToken);
        navigate("/verifyEmail");
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

        <button>Login </button>
        <a href="#">Forget Password ?</a>
      </form>
    </div>
  );
};

export default Login;
