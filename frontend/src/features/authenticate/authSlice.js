import { createSlice } from "@reduxjs/toolkit";

// Initialize state from localStorage (used only for UI display)
const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Save user data to Redux + localStorage
    setCredentials: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    // Clear user data from Redux + localStorage
    resetCredentials: (state) => {
      state.user = null;
      localStorage.removeItem("user");

      // (Optional) clear "session" if mistakenly set before
      localStorage.removeItem("session");
    },
  },
});

export const { setCredentials, resetCredentials } = authSlice.actions;

export default authSlice.reducer;
