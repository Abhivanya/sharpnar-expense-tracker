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
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
    dowonloadExpences() {
      alert("Dwonlaoding expences");
    },
    activatePremium(state) {
      state.isPremium = true;
      state.theme = "dark";
    },
    dactivatePremium(state) {
      state.theme = "light";
      state.isPremium = false;
    },
  },
});

export default premiumSlice.reducer;
export const premiumActions = premiumSlice.actions;
