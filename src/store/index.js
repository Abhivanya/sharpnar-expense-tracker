import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import expenseReducer from "./expenseSlice.js";
import premiumReducer from "./premiumSlice.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    expense: expenseReducer,
    premium: premiumReducer,
  },
});

export default store;
