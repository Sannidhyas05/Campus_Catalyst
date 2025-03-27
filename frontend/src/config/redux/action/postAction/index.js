import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = createAsyncThunk(
  "/api/posts/getPosts",
  async (_, thunkAPI) => {
    try {
      const response = await clientServer.get("/api/posts/getPosts");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
