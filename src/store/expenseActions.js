import { expensesActions } from "./expenseSlice";

export const addExpenseAction = (amount, description, category) => {
  return (dispatch) => {
    console.log("hitted");
    fetch(
      "https://wheatherapp-f9067-default-rtdb.firebaseio.com/expences.json",
      {
        method: "POST",
        body: JSON.stringify({
          amount: amount,
          description: description,
          category: category,
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
        console.log("inside action", res);
        alert("Expense Added successfully");
        dispatch(
          expensesActions.addExpense({
            id: res.name,
            amount,
            description,
            category,
          })
        );
      })
      .catch((err) => {
        alert(err.message);
        console.log(err);
      });
  };
};
const updateExpenseAction = (item) => {
  return (dispatch) => {};
};
export const removeExpenseAction = (id) => {
  return (dispatch) => {
    fetch(
      `https://wheatherapp-f9067-default-rtdb.firebaseio.com/expences/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete expense.");
        }
        dispatch(expensesActions.removeExpense({ id }));
        alert("Expense deleted successfully!");
      })
      .catch((err) => {
        console.error(err);
        alert(`Failed to delete expense: ${err.message}`);
      });
  };
};

export const fetchData = () => {
  return (dispatch) => {
    fetch("https://wheatherapp-f9067-default-rtdb.firebaseio.com/expences.json")
      .then((response) => response.json())
      .then((res) => {
        if (!res) {
          return;
        }
        if (res.error) {
          throw new Error(res.error);
        }
        console.log(res);
        dispatch(expensesActions.replaceExpences(res));
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };
};
