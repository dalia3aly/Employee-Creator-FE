import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchEmployees,
  createEmployee,
  deleteEmployee,
} from "../../api/employeeService";
import { Employee } from "../../types";

export const fetchEmployeesThunk = createAsyncThunk<Employee[]>(
  "employees/fetchEmployees",
  async () => {
    const employees = await fetchEmployees();
    return employees;
  }
);

export const createEmployeeThunk = createAsyncThunk<Employee, Employee>(
  "employees/createEmployee",
  async (employee: Employee) => {
    const newEmployee = await createEmployee(employee);
    return newEmployee;
  }
);

export const deleteEmployeeThunk = createAsyncThunk<number, number>(
  "employees/deleteEmployee",
  async (id: number) => {
    await deleteEmployee(id);
    return id;
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState: [] as Employee[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchEmployeesThunk.fulfilled,
      (state, action: PayloadAction<Employee[]>) => {
        console.log("fetchEmployeesThunk fulfilled:", action.payload);
        return action.payload;
      }
    );
    builder.addCase(
      createEmployeeThunk.fulfilled,
      (state, action: PayloadAction<Employee>) => {
        console.log("createEmployeeThunk fulfilled:", action.payload);
        state.push(action.payload);
      }
    );
    builder.addCase(
      deleteEmployeeThunk.fulfilled,
      (state, action: PayloadAction<number>) => {
        console.log("deleteEmployeeThunk fulfilled:", action.payload);
        return state.filter((employee) => employee.id !== action.payload);
      }
    );
  },
});

export default employeeSlice.reducer;
