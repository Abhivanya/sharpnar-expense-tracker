// login thunk

import { authActions } from "./authSlice";
export const loginAction = (email, password) => {
  return (dispatch) => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDDTATv0YiM4tUTMW_am_sGPbArW4ZmUOk",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
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

        alert("SignIn Successfully");
        localStorage.setItem("token", res.idToken);
        dispatch(authActions.loggedIn({ token: res.idToken }));
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };
};

export const logoutAction = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch(authActions.logout());
  };
};

export const singupAction = (email, password) => {
  return (dispatch) => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDDTATv0YiM4tUTMW_am_sGPbArW4ZmUOk",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.error) {
          throw new Error(res.error.message);
        } else {
          console.log(res);
          alert("SignUp Successfully");
          localStorage.setItem("token", res.idToken);
          dispatch(authActions.signup({ token: res.idToken }));
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };
};
