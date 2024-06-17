import axios from "axios";
import { EmployeeFormData } from "../components/EmployeeForm/EmployeeForm";

const API_URL = "http://localhost:8080/api/employees";

export const fetchEmployees = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const deleteEmployee = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const createEmployee = async (employee: EmployeeFormData) => {
  const response = await axios.post(API_URL, employee);
  return response.data;
};

export const updateEmployee = async (
  id: number,
  employee: EmployeeFormData
) => {
  const response = await axios.patch(`${API_URL}/${id}`, employee);
  return response.data;
};
