import { createSlice } from "@reduxjs/toolkit";
import { getPosts } from "../../action/postAction/index";

const initialState = {
  posts: [],
  isError: false,
  isLoading: false,
  loggedIn: false,
  message: "",
  comments: [],
  postId: "",
  postFetched: false,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: () => initialState,
    resetPostId: (state) => {
      state.postId = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
        state.message = "Fetching Posts...";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        console.log("Redux Received Posts:", action.payload);
        state.isLoading = false;
        state.isError = false;
        state.postFetched = true;
        state.posts = action.payload?.posts || [];
        state.message = "Posts fetched successfully!";
      })

      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch posts.";
      });
  },
});

export const { reset, resetPostId } = postSlice.actions;
export default postSlice.reducer;
