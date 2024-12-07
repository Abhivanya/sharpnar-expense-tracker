import React, { useRef } from "react";
import Style from "./Signup.module.css";
const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSignup = (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      alert("Password Did not match");
      return;
    }
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?Key=AIzaSyDGFVm98_6VmN7odn0DZtuX7Qrnfv7UvNQ",
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
        // if (!res.ok) {
        //   throw new Error(res.message);
        // }
        console.log(res);
        // alert("Signup Succesfully");
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
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
