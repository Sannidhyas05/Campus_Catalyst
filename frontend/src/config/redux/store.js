/*
 *
 * Steps for state management
 *
 * 1. submit action
 * 2. handle actiom in its reducer
 * 3. handle here -> reducer
 *
 */

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/reducer/authReducer/index";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
