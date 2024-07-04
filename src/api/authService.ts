import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  const token = response.data.token;
  localStorage.setItem("token", token);
  return response.data;
};

export const signup = async (
  username: string,
  password: string,
  email: string
) => {
  const response = await axios.post(`${API_URL}/signup`, {
    username,
    password,
    email,
  });
  const token = response.data.token;
  localStorage.setItem("token", token);
  return response.data;
};

export const signout = () => {
  localStorage.removeItem("token");
};