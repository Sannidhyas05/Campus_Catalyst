import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Ensure axios is imported
import { BASE_URL, clientServer } from "@/config";

/** ✅ **Get all posts** */
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
  async (postData, thunkAPI) => {
    try {
      const formData = new FormData();

      if (postData.postType) {
        formData.append("postType", postData.postType);
      } else {
        console.error("❌ postType is missing!");
      }

      if (postData.content?.trim()) {
        formData.append("content", postData.content);
      } else {
        console.error("❌ Content is missing!");
      }

      if (postData.file) {
        formData.append("media", postData.file);
      } else {
        console.error("❌ Media is missing!");
      }

      console.log("📤 Sending FormData:");
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": ", pair[1]);
      }

      const token = localStorage.getItem("token");
      if (!token) {
        return thunkAPI.rejectWithValue({
          message: "Unauthorized: No token found",
        });
      }

      const response = await axios.post(
        `${BASE_URL}/api/posts/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Post creation failed" }
      );
    }
  }
);
