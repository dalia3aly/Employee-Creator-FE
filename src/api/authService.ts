import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    const token = response.data.token;
    localStorage.setItem("token", token);
    return response.data;
  } catch (error) {
    return { error: "Wrong username or password. Please try again." };
  }
};

export const signup = async (
  username: string,
  password: string,
  email: string
) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      password,
      email,
    });
    const token = response.data.token;
    localStorage.setItem("token", token);
    return response.data;
  } catch (error) {
    return { error: "Signup failed. Please try again." };
  }
};

export const signout = () => {
  localStorage.removeItem("token");
};
