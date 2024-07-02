import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/Login/LoginForm";
import { login } from "../../api/authService";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async (data: { username: string; password: string }) => {
    try {
      const response = await login(data.username, data.password);
      localStorage.setItem("token", response.token);
      navigate("/employees");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
