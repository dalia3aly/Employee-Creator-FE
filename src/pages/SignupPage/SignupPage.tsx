import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "../../components/Signup/SignupForm";
import { signup } from "../../api/authService";
import { AxiosError } from "axios";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);

  const handleSignup = async (data: {
    username: string;
    password: string;
    email: string;
  }) => {
    try {
      const response = await signup(data.username, data.password, data.email);
      setMessage("User created successfully! Redirecting to login page...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Signup failed", error);

      // narrow down the type of "error"
      if (error instanceof AxiosError) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setMessage(error.response.data.message); // server-side validation error message
        } else {
          setMessage("Signup failed. Please try again.");
        }
      } else {
        setMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-fixed bg-no-repeat bg-center"
      style={{ backgroundImage: `url(/hm.png)` }}>
      <h2 className="text-xl font-semibold mb-4 mt-8 flex-col items-center justify-center max-w-60 bg-indigo-300 p-4 rounded-md mx-auto my-auto">
        Admin Registration
      </h2>
      <div>
        <SignupForm onSubmit={handleSignup} message={message} />
      </div>
    </div>
  );
};

export default SignupPage;
