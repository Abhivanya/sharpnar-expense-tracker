import React, { useRef } from "react";

const ResetPassword = () => {
  const codeRef = useRef();
  const newPasswordRef = useRef();
  const handleReset = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        onSubmit={handleReset}
        className="flex border-4 flex-col gap-4 p-3 rounded-md justify-evenly border-black mt-5 w-[60%] h-[300px]"
      >
        <div className="mt-4 flex justify-evenly items-center ">
          <label htmlFor="code">Verifcation Code</label>
          <input type="text" id="code" ref={codeRef} />
        </div>
        <div className="mt-4 flex justify-evenly items-center ">
          <label htmlFor="password">New Password</label>
          <input type="text" id="password" ref={newPasswordRef} />
        </div>
        <button className="px-3 py-1 rounded-md hover:bg-blue-300 bg-blue-600 text-white self-center w-[150px]">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
