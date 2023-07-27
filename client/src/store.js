import { configureStore } from "@reduxjs/toolkit";
import { foodSlice } from "./slice";

export const store = configureStore({
  reducer: {
    food: foodSlice.reducer,
  },
});
