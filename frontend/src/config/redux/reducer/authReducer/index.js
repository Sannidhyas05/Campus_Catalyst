import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  getAboutUser,
  getAllUsers,
} from "../../action/authAction/index";

const initialState = {
  user: undefined,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  isTokenThere: false,
  profilefetched: false,
  followers: [],
  following: [],
  profile: {},
  allProfilesFetched: false,
  allUsers: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
    handleLoginUser: (state) => {
      state.message = "hello";
    },

    emptyMessage: (state) => {
      state.message = "";
    },
    setTokenIsThere: (state) => {
      state.isTokenThere = true;
    },
    setTokenIsNotThere: (state) => {
      state.isTokenThere = false;
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
        state.message = { message: "Login Successful!" };
        state.profilefetched = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
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
        state.message = { message: "Registration Successful. Please Login!" };
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      // Get User Profile

      .addCase(getAboutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.profilefetched = true;
        state.user = action.payload.user;
        state.profile = action.payload || {};
      })
      .addCase(getAboutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.profilefetched = false;
        state.message = action.payload?.message || "Failed to fetch user data";
      })

      // Get all Profiles

      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        if (Array.isArray(action.payload)) {
          state.allUsers = action.payload;
        } else {
          state.allUsers = [];
        }

        state.allProfilesFetched = true;
      });
  },
});

export const { reset, emptyMessage, setTokenIsNotThere, setTokenIsThere } =
  authSlice.actions;
export default authSlice.reducer;
