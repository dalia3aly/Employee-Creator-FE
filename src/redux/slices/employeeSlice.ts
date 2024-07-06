import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchEmployees,
  createEmployee,
  deleteEmployee,
} from "../../api/employeeService";
import { Employee } from "../../types";

export const fetchEmployeesThunk = createAsyncThunk<Employee[]>(
  "employees/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const employees = await fetchEmployees();
      return employees;
    } catch (error) {
      return rejectWithValue("Failed to fetch employees.");
    }
  }
);

export const createEmployeeThunk = createAsyncThunk<Employee, Employee>(
  "employees/createEmployee",
  async (employee: Employee, { rejectWithValue }) => {
    try {
      const newEmployee = await createEmployee(employee);
      return newEmployee;
    } catch (error) {
      return rejectWithValue("Failed to create employee.");
    }
  }
);

export const deleteEmployeeThunk = createAsyncThunk<number, number>(
  "employees/deleteEmployee",
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteEmployee(id);
      return id;
    } catch (error) {
      return rejectWithValue("Failed to delete employee.");
    }
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState: { list: [] as Employee[], error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchEmployeesThunk.fulfilled,
      (state, action: PayloadAction<Employee[]>) => {
        state.list = action.payload;
      }
    );
    builder.addCase(
      createEmployeeThunk.fulfilled,
      (state, action: PayloadAction<Employee>) => {
        state.list.push(action.payload);
      }
    );
    builder.addCase(
      deleteEmployeeThunk.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.list = state.list.filter(
          (employee) => employee.id !== action.payload
        );
      }
    );
    builder.addCase(fetchEmployeesThunk.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(createEmployeeThunk.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(deleteEmployeeThunk.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const selectEmployeeError = (state: any) => state.employees.error;

export default employeeSlice.reducer;
