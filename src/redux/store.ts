import { configureStore } from "@reduxjs/toolkit";
import employeeReducer, { selectEmployeeError } from "./slices/employeeSlice";
import { useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
});

export const useAppSelector = (selector: typeof selectEmployeeError) =>
  useSelector(selector);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;