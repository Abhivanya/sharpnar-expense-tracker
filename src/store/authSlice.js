import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isLoggedIn: !!token,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
