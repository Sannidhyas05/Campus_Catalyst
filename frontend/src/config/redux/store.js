import { configureStore } from "@reduxjs/toolkit";

//steps for state management

// 1. submit actions
// 2. handle actions in reducers
// 3. register reducers in store

export const store = configureStore({
  reducer: {
    //reducers
  },
});
