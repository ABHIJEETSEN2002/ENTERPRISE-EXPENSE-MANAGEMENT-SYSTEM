import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./slices/expenseSlice"; // Ensure this file exists

const store = configureStore({
  reducer: {
    expenses: expenseReducer,
  },
});

export default store;
