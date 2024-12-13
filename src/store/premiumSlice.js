import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPremium: false,
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
    activatePremium(state) {
      state.isPremium = true;
    },
    dactivatePremium(state) {
      state.isPremium = false;
    },
  },
});

export default premiumSlice.reducer;
export const premiumActions = premiumSlice.actions;
