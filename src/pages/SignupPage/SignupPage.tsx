import React from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "../../components/Signup/SignupForm";
import { signup } from "../../api/authService";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSignup = async (data: {
    username: string;
    password: string;
    email: string;
  }) => {
    try {
      const response = await signup(data.username, data.password, data.email);
      localStorage.setItem("token", response.token);
      navigate("/employees");
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(/hm.png)` }}>
      <h2 className="text-xl font-semibold mb-4 mt-8 flex-col items-center justify-center max-w-60 bg-gray-300 p-4 rounded-md mx-auto my-auto">
        Admin Registration
      </h2>
      <div>
        <SignupForm onSubmit={handleSignup} />
      </div>
    </div>
  );
};

export default SignupPage;
