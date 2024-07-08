import React from "react";
import { Control, Controller } from "react-hook-form";
import { EmployeeFormData } from "../EmployeeForm";

interface ContactDetailsProps {
  control: Control<EmployeeFormData>;
  errors: any;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({ control, errors }) => (
  <div>
    <div className="mb-4">
      <label className="block text-gray-700">Email</label>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <input {...field} className="w-full mt-1 p-2 border rounded" />
        )}
      />
      {errors.email && <p className="text-red-600">{errors.email.message}</p>}
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Mobile Number</label>
      <Controller
        name="mobileNumber"
        control={control}
        render={({ field }) => (
          <input {...field} className="w-full mt-1 p-2 border rounded" />
        )}
      />
      {errors.mobileNumber && (
        <p className="text-red-600">{errors.mobileNumber.message}</p>
      )}
    </div>
  </div>
);

export default ContactDetails;
