import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signupSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  email: z.string().email("Invalid email address"),
});

type SignupFormInputs = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onSubmit: (data: SignupFormInputs) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
      <div className="flex-col items-center justify-center max-w-60 bg-gray-300 p-4 rounded-md mx-auto my-auto">
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <input {...field} className="mt-1 p-2 border rounded" />
            )}
          />
          {errors.username && (
            <p className="text-red-600">{errors.username.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                className="mt-1 p-2 border rounded"
              />
            )}
          />
          {errors.password && (
            <p className="text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                className="mt-1 p-2 border rounded"
              />
            )}
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
