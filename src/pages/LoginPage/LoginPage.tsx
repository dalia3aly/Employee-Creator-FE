import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/Login/LoginForm";
import { login } from "../../api/authService";
import Notification from "../../components/Notification/Notification";

const LoginPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (data: { username: string; password: string }) => {
    const response = await login(data.username, data.password);
    if (response.error) {
      setError(response.error);
    } else {
      localStorage.setItem("token", response.token);
      navigate("/employees");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-fixed bg-no-repeat bg-center"
      style={{ backgroundImage: `url(/hm.png)` }}>
      <h2 className="text-xl font-semibold mb-4 mt-8 flex-col items-center justify-center max-w-60 bg-indigo-200 p-4 rounded-md mx-auto my-auto">
        Admin Login
      </h2>
      <div>
        <LoginForm onSubmit={handleLogin} />
      </div>
      {error && <Notification message={error} type="error" />}
    </div>
  );
};

export default LoginPage;
