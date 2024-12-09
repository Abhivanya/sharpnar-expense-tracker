import React, { useRef, useState } from "react";

const Expences = () => {
  const [expences, setExpences] = useState([
    { id: 1, amount: 300, description: "test", category: "food" },
  ]);

  const amountRef = useRef();
  const desRef = useRef();
  const categoryRef = useRef();

  const addExpense = (e) => {
    e.preventDefault();
    setExpences((prev) => [
      ...prev,
      {
        id: date.now(),
        amount: amountRef.current.value,
        description: desRef.current.value,
        category: categoryRef.current.value,
      },
    ]);
  };
  return (
    <div className="flex flex-col  w-[90%] mx-[auto] p-5 bg-yellow-100 rounded-md">
      <form
        className="flex gap-2 justify-evenly items-center bg-slate-300 p-3 rounded-md"
        onSubmit={addExpense}
      >
        <div className="flex flex-col p-1 gap-2">
          <label htmlFor="amount">Amount :</label>
          <input type="text" id="amount" required ref={amountRef} />
        </div>
        <div className="flex flex-col p-1 gap-2">
          <label htmlFor="des">Description :</label>
          <input type="text" id="des" required ref={desRef} />
        </div>
        <div className="flex flex-col p-1 gap-2">
          <label htmlFor="category">Category :</label>
          <select ref={categoryRef}>
            <option value="food">Food</option>
            <option value="petrol">Petrol</option>
            <option value="salary">Salary</option>
          </select>
        </div>
        <button className="px-3 py-1 bg-blue-600 text-white h-8 rounded-md hover:bg-blue-300">
          Add Expense
        </button>
      </form>
      <div>
        <h1 className="text-3xl text-blue-500 underline underline-offset-4 text-center">
          Expences
        </h1>
        <div className="flex w-[90%] bg-green-800">
          helo
          {expences.map((expence) => {
            <div key={expence.id}>
              <div>{expence.description}</div>
              <div>{expence.amount}</div>
              <div>{expence.category}</div>
            </div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Expences;
