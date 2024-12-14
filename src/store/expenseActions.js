import { expensesActions } from "./expenseSlice";

export const addExpenseAction = (amount, description, category) => {
  return (dispatch) => {
    const email = localStorage.getItem("email").replace(".", "_");
    fetch(
      `https://wheatherapp-f9067-default-rtdb.firebaseio.com/${email}/expences.json`,
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
export const updateExpenseAction = (amount, description, category, id) => {
  return (dispatch) => {
    const email = localStorage.getItem("email").replace(".", "_");
    fetch(
      `https://wheatherapp-f9067-default-rtdb.firebaseio.com/${email}/expences/${id}.json
`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
          description: description,
          category: category,
        }),
      }
    )
      .then((response) => response.json())
      .then(() => {
        alert("Expense Updated");
        dispatch(
          expensesActions.updateExpense({
            id,
            amount,
            description,
            category,
          })
        );
      })
      .catch((err) => alert(err.message));
  };
};
export const removeExpenseAction = (id) => {
  return (dispatch) => {
    const email = localStorage.getItem("email").replace(".", "_");
    fetch(
      `https://wheatherapp-f9067-default-rtdb.firebaseio.com/${email}/expences/${id}.json`,
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
    const email = localStorage.getItem("email").replace(".", "_");
    fetch(
      `https://wheatherapp-f9067-default-rtdb.firebaseio.com/${email}/expences.json`
    )
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

export const downloadeFileAction = () => {
  return () => {
    const email = localStorage.getItem("email").replace(".", "_");
    fetch(
      `https://wheatherapp-f9067-default-rtdb.firebaseio.com/${email}/expences.json`
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          alert("No expenses found to download.");
          return;
        }

        const expenses = Object.entries(data).map(([id, expense]) => ({
          id,
          ...expense,
        }));
        const csvHeader = "ID,Amount,Description,Category";
        const csvRows = expenses.map(
          (expense) =>
            `${expense.id},${expense.amount},${expense.description},${expense.category}`
        );
        const csvContent = [csvHeader, ...csvRows].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "expenses.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        alert("Expenses downloaded successfully!");
      })
      .catch((err) => {
        console.error(err);
        alert(`Failed to download expenses: ${err.message}`);
      });
  };
};
