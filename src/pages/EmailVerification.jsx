import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const [emailSent, setEmailSent] = useState(false);
  const handleClick = (e) => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDDTATv0YiM4tUTMW_am_sGPbArW4ZmUOk",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: localStorage.getItem("token"),
        }),
      }
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.error) {
          throw new Error(res.error);
        }
        console.log(res);
        alert(`Verification Email send To ${res.email} Verify The email`);
        setEmailSent(true);
      })
      .catch((err) => {
        console.log(err);
        alert(err.meassage);
      });
  };

  const [emailVerified, setEmailVerified] = useState(false);
  const navigate = useNavigate();

  if (emailSent) {
    const interval = setInterval(() => {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDDTATv0YiM4tUTMW_am_sGPbArW4ZmUOk",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: localStorage.getItem("token"),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((res) => {
          if (res.error) {
            throw new Error(res.error);
          }
          console.log(res.users[0]);
          if (res.users && res.users.length > 0) {
            if (res.users[0].emailVerified) {
              setEmailVerified(true);
            }
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
    }, 5000);

    if (emailVerified) {
      clearInterval(interval);
      navigate("profile");
    }
  }
  return (
    <div className="flex h-full w-full justify-center items-center flex-col gap-10">
      <button
        className="mt-10 bg-green-300 px-3 py-1 rounded-md border-black hover:bg-green-700 border-2"
        onClick={handleClick}
      >
        Verify Email
      </button>
      {emailSent && (
        <p className="text-red-600">
          Verficaton link send to your Email please verify Email
        </p>
      )}
    </div>
  );
};

export default EmailVerification;
