import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../action/authAction/index";

const initialState = {
  user: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  profilefetched: false,
  followers: [],
  following: [],
  profile: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
    handleLoginUser: (state) => {
      state.message = "hello";
    },
  },

  extraReducers: (builders) => {
    builders

      // Login User

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.message = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "success";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
      })

      // Register User

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.message = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "success";
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
      });
  },
});

export default authSlice.reducer;
