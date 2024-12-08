import React, { useEffect, useRef } from "react";

const Profile = () => {
  const nameRef = useRef();
  const urlRef = useRef();

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDDTATv0YiM4tUTMW_am_sGPbArW4ZmUOk",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("token"),
          displayName: nameRef.current.value,
          photo: urlRef.current.value,
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
        console.log(res);
        alert("profile updated successfully");
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("user not login");
    }
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
          nameRef.current.value = res.users[0].displayName;
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }, [handleUpdate]);

  return (
    <form
      className="flex flex-col gap-4 items-center justify-center w-full"
      onSubmit={handleUpdate}
    >
      <div className="flex justify-between w-[80%] m-8">
        <h1 className="font-bold ">Contact Details</h1>
        <button className="rounded-md border-red-400 text-red-400 px-1 py-1 border-2 font-semibold">
          Cancel
        </button>
      </div>
      <div className="flex justify-evenly w-[90%]">
        <label className="text-bold">Full name</label>
        <input className="outline-none rounded-md px-2" ref={nameRef} />
        <label className="text-bold">Profile photo URl</label>
        <input ref={urlRef} />
      </div>
      <button className="text-white bg-red-500 px-2 py-1 rounded-md self-start ml-[60px] mt-4">
        Update
      </button>
    </form>
  );
};

export default Profile;
