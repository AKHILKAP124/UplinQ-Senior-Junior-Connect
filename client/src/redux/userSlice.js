import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
        },
    clearUser: (state) => {
      state.user = [];
    }
  },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
