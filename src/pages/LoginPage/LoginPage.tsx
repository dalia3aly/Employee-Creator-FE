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
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(/bk.png)` }}>
      <h2 className="text-xl font-semibold mb-4 mt-8 flex-col items-center justify-center max-w-60 bg-gray-300 p-4 rounded-md mx-auto my-auto">
        Admin Login
      </h2>
      <div>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;
