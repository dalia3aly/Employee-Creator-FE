import React from "react";
import { Control, Controller } from "react-hook-form";
import { EmployeeFormData } from "../EmployeeForm";

interface PersonalInformationProps {
  control: Control<EmployeeFormData>;
  errors: any;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({
  control,
  errors,
}) => (
  <div>
    <div className="mb-4">
      <label className="block text-gray-700">First Name</label>
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => (
          <input {...field} className="w-full mt-1 p-2 border rounded" />
        )}
      />
      {errors.firstName && (
        <p className="text-red-600">{errors.firstName.message}</p>
      )}
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Middle Name</label>
      <Controller
        name="middleName"
        control={control}
        render={({ field }) => (
          <input {...field} className="w-full mt-1 p-2 border rounded" />
        )}
      />
      {errors.middleName && (
        <p className="text-red-600">{errors.middleName.message}</p>
      )}
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Last Name</label>
      <Controller
        name="lastName"
        control={control}
        render={({ field }) => (
          <input {...field} className="w-full mt-1 p-2 border rounded" />
        )}
      />
      {errors.lastName && (
        <p className="text-red-600">{errors.lastName.message}</p>
      )}
    </div>
  </div>
);

export default PersonalInformation;
