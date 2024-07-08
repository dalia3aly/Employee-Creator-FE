import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signupSchema = z.object({
  username: z
    .string()
    .min(
      8,
      "Username must be at least 8 characters long and may contain both letters and digits."
    ),
  password: z
    .string()
    .min(
      1,
      "Password must be at least 8 characters long and must contain both letters and digits"
    ),
  email: z.string().email("Invalid email address"),
});

type SignupFormInputs = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onSubmit: (data: SignupFormInputs) => void;
  message: string | null;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, message }) => {
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
      <div className="flex-col items-center justify-center max-w-60 bg-indigo-200 p-4 rounded-md mx-auto my-auto">
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

        {message && (
          <div className="mb-4">
            <p className="text-green-600">{message}</p>
          </div>
        )}

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
