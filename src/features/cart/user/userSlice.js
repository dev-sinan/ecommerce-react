import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;

      
      // remove auth token and the persisted root so redux-persist doesn't rehydrate stale user state
      localStorage.removeItem("token");
      localStorage.removeItem("persist:root"); 
      sessionStorage.clear();
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
