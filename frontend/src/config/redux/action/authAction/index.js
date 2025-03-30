import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "../../../index.jsx";

export const loginUser = createAsyncThunk(
  "/api/user/login",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.post("/api/users/login", {
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
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "/api/users/register",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.post("/api/users/register", {
        sapId: user.sapId,
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role,
      });
      return thunkAPI.fulfillWithValue({ message: response.data.message });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAboutUser = createAsyncThunk(
  "/api/users/profile",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.get("/api/users/profile", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log("Fetched Profile Data:", response.data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "/api/users/allUsers",

  async (_, thunkAPI) => {
    try {
      const response = await clientServer.get("/api/users/allUsers");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
