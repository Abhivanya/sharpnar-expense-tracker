import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "dark",
};

const premiumSlice = createSlice({
  name: "priemium",
  initialState: initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "dark" ? "white" : "dark";
    },
    dowonloadExpences() {
      alert("Dwonlaoding expences");
    },
  },
});

export default premiumSlice.reducer;
export const premiumActions = premiumSlice.actions;
