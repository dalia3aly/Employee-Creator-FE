import { EmployeeFormData } from "@/components/EmployeeForm/EmployeeForm";
import axios from "axios";

const API_URL = "http://localhost:8080/api/employees";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export const fetchEmployees = async () => {
  const response = await axios.get(API_URL, { headers: getAuthHeaders() });
  return response.data;
};

export const deleteEmployee = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
};

export const createEmployee = async (employee: EmployeeFormData) => {
  const response = await axios.post(API_URL, employee, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const updateEmployee = async (
  id: number,
  employee: EmployeeFormData
) => {
  const response = await axios.patch(`${API_URL}/${id}`, employee, {
    headers: getAuthHeaders(),
  });
  return response.data;
};
