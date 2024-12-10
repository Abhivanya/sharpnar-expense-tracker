import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
};

const expenseSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    addExpense(state, action) {
      expenses.push(action.payload.expense);
    },
  },
});

export default expense.reducer;
export const authActions = expense.actions;
