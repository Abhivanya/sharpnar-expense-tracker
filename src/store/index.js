import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    expense: expenseSlice.reducer,
  },
});

export default store;
