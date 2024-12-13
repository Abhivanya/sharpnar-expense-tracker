import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: {},
  totalExpenses: 0,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialState,
  reducers: {
    addExpense(state, action) {
      const { id, amount, description, category } = action.payload;
      state.expenses[id] = { amount, description, category };
      state.totalExpenses += Number(amount);
    },
    replaceExpences(state, action) {
      state.expenses = action.payload || {};
      state.totalExpenses = Object.values(state.expenses).reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
      );
    },
    removeExpense(state, action) {
      const { id } = action.payload;
      if (state.expenses[id]) {
        state.totalExpenses -= Number(state.expenses[id].amount);
        delete state.expenses[id];
      }
    },
    updateExpense(state, action) {},
  },
});

export default expenseSlice.reducer;
export const expensesActions = expenseSlice.actions;
