import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "../../../index.jsx";

export const loginUser = createAsyncThunk(
  "user/login",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.post("/login", {
        email: user.email,
        password: user.password,
      });

      const data = response.data;
      if (!data?.token) {
        return thunkAPI.rejectWithValue({
          message: "Token not provided by server",
        });
      }

      localStorage.setItem("token", data.token);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message || "Login failed" }
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.post("/register", user);

      const data = response.data;
      if (!data?.token) {
        return thunkAPI.rejectWithValue({
          message: "Token not provided by server",
        });
      }

      localStorage.setItem("token", data.token);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message || "Register failed" }
      );
    }
  }
);
