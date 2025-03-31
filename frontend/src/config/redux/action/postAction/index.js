import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Ensure axios is imported
import { BASE_URL, clientServer } from "@/config";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await clientServer.get(
        `${BASE_URL}/api/posts/getPosts`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch posts");
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/create",
  async (formData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${BASE_URL}/api/posts/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        return thunkAPI.fulfillWithValue("Post Uploaded");
      } else {
        return thunkAPI.rejectWithValue("Post not uploaded");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Upload failed");
    }
  }
);
