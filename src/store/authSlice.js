import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loggedIn(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    signup(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
