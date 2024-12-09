import React, { useRef, useState, useEffect } from "react";

const Expences = () => {
  const [expences, setExpences] = useState({});

  const [refetch, setRefetch] = useState(false);
  const amountRef = useRef();
  const desRef = useRef();
  const categoryRef = useRef();

  useEffect(() => {
    fetch("https://wheatherapp-f9067-default-rtdb.firebaseio.com/expences.json")
      .then((response) => response.json())
      .then((res) => {
        if (res.error) {
          throw new Error(res.error);
        }
        console.log(res);
        setExpences(res);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }, [refetch]);

  const addExpense = (e) => {
    e.preventDefault();
    fetch(
      "https://wheatherapp-f9067-default-rtdb.firebaseio.com/expences.json",
      {
        method: "POST",
        body: JSON.stringify({
          amount: amountRef.current.value,
          description: desRef.current.value,
          category: categoryRef.current.value,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.error) {
          throw new Error(res.error.message);
        }
        console.log(res);
        alert("Expense Added successfully");
        setRefetch(!refetch);
      })
      .catch((err) => {
        alert(err.message);
        console.log(err);
      });
    e.target.reset();
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
      <div className="mt-8">
        <h1 className="text-3xl text-blue-500 underline underline-offset-4 text-center font-bold">
          Expences
        </h1>
        <div className="flex w-[99%] min-h-[400px] p-4 mt-4 bg-green-300 rounded-md gap-2 flex-wrap">
          {Object.entries(expences).map(([key, expense]) => (
            <div
              key={key}
              className="border-2 border-blue-400 p-3 rounded-md w-[200px] h-[150px] flex flex-col font-semibold"
            >
              <div>{expense.description}</div>
              <div>{expense.amount}</div>
              <div>{expense.category}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Expences;
