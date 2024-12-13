import React, { useRef, useState, useEffect } from "react";
import {
  addExpenseAction,
  fetchData,
  removeExpenseAction,
} from "../store/expenseActions";
import { useDispatch, useSelector } from "react-redux";

const Expenses = () => {
  const [refetch, setRefetch] = useState(false);
  const amountRef = useRef();
  const desRef = useRef();
  const categoryRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [refetch]);

  const expenseItems = useSelector((state) => state.expense.expenses);
  const totalExpences = useSelector((state) => state.expense.totalExpenses);

  const addExpense = (e) => {
    e.preventDefault();
    dispatch(
      addExpenseAction(
        amountRef.current.value,
        desRef.current.value,
        categoryRef.current.value
      )
    );
    e.target.reset();
  };

  const handleDelete = (id) => {
    dispatch(removeExpenseAction(id));
  };

  const handleUpdate = (id) => {
    const updatedAmount = prompt("Enter new amount:");
    const updatedDescription = prompt("Enter new description:");
    const updatedCategory = prompt("Enter new category:");

    if (updatedAmount && updatedDescription && updatedCategory) {
      fetch(
        `https://wheatherapp-f9067-default-rtdb.firebaseio.com/expenses/${id}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: updatedAmount,
            description: updatedDescription,
            category: updatedCategory,
          }),
        }
      )
        .then((response) => response.json())
        .then(() => {
          setRefetch(!refetch);
          alert("Expense Updated");
        })
        .catch((err) => alert(err.message));
    }
  };

  const handleDownloadCSV = () => {};

  return (
    <div className="flex flex-col w-[90%] mx-auto p-5 bg-yellow-100 rounded-md">
      <form
        className="flex gap-2 justify-evenly items-center bg-slate-300 p-3 rounded-md"
        onSubmit={addExpense}
      >
        <div className="flex flex-col p-1 gap-2">
          <label htmlFor="amount">Amount:</label>
          <input type="number" id="amount" required ref={amountRef} />
        </div>
        <div className="flex flex-col p-1 gap-2">
          <label htmlFor="des">Description:</label>
          <input type="text" id="des" required ref={desRef} />
        </div>
        <div className="flex flex-col p-1 gap-2">
          <label htmlFor="category">Category:</label>
          <select ref={categoryRef}>
            <option value="food">Food</option>
            <option value="petrol">Petrol</option>
            <option value="salary">Salary</option>
          </select>
        </div>
        <button className="px-3 py-1 bg-blue-600 text-white h-8 rounded-md hover:bg-blue-300">
          Add Expense
        </button>
        <div>Total Expense : {totalExpences}</div>
      </form>

      <div className="mt-8">
        <h1 className="text-3xl text-blue-500 underline text-center font-bold">
          Expenses
        </h1>
        <div className="relative flex w-[99%] min-h-[400px] p-4 mt-4 bg-green-300 rounded-md gap-2 flex-wrap">
          <button
            className="absolute top-8 right-8 border-2 border-blue-600 rounded-md px-3 py-1 font-bold bg-white text-blue-600"
            onClick={handleDownloadCSV}
          >
            Download CSV
          </button>

          {expenseItems &&
            Object.entries(expenseItems).map(([key, expense]) => (
              <div
                key={key}
                className="border-2 border-blue-400 p-3 rounded-md w-[200px] h-[200px] overflow-y-auto flex flex-col font-semibold"
              >
                <div>{expense.description}</div>
                <div>{expense.amount}</div>
                <div>{expense.category}</div>
                <div className="self-end flex justify-between w-full mt-4">
                  <button
                    className="px-3 py-1 bg-yellow-300 rounded-md hover:bg-blue-500"
                    onClick={() => handleUpdate(key)}
                  >
                    Update
                  </button>
                  <button
                    className="px-3 py-1 rounded-md hover:bg-blue-500 bg-red-500"
                    onClick={() => handleDelete(key)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Expenses;
