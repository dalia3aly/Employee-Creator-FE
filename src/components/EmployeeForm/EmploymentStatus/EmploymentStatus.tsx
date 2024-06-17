import React from "react";
import { Control, Controller } from "react-hook-form";
import { EmployeeFormData } from "../EmployeeForm";

interface EmploymentStatusProps {
  control: Control<EmployeeFormData>;
  errors: any;
}

const EmploymentStatus: React.FC<EmploymentStatusProps> = ({
  control,
  errors,
}) => (
  <div>
    <div className="mb-4">
      <label className="block text-gray-700">Contract Type</label>
      <Controller
        name="contractType"
        control={control}
        render={({ field }) => (
          <select {...field} className="w-full mt-1 p-2 border rounded">
            <option value="PERMANENT">Permanent</option>
            <option value="CONTRACT">Contract</option>
          </select>
        )}
      />
      {errors.contractType && (
        <p className="text-red-600">{errors.contractType.message}</p>
      )}
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Start Date</label>
      <Controller
        name="startDate"
        control={control}
        render={({ field }) => (
          <input
            type="date"
            {...field}
            className="w-full mt-1 p-2 border rounded"
          />
        )}
      />
      {errors.startDate && (
        <p className="text-red-600">{errors.startDate.message}</p>
      )}
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Finish Date</label>
      <Controller
        name="finishDate"
        control={control}
        render={({ field }) => (
          <input
            type="date"
            {...field}
            className="w-full mt-1 p-2 border rounded"
          />
        )}
      />
      {errors.finishDate && (
        <p className="text-red-600">{errors.finishDate.message}</p>
      )}
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">On Going</label>
      <Controller
        name="onGoing"
        control={control}
        render={({ field }) => (
          <input
            type="checkbox"
            className="mt-1 p-2 border rounded"
            checked={field.value || false}
            onChange={(e) => field.onChange(e.target.checked)}
          />
        )}
      />
      {errors.onGoing && (
        <p className="text-red-600">{errors.onGoing.message}</p>
      )}
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Employment Type</label>
      <Controller
        name="employmentType"
        control={control}
        render={({ field }) => (
          <select {...field} className="w-full mt-1 p-2 border rounded">
            <option value="FULL_TIME">Full-time</option>
            <option value="PART_TIME">Part-time</option>
          </select>
        )}
      />
      {errors.employmentType && (
        <p className="text-red-600">{errors.employmentType.message}</p>
      )}
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Hours per Week</label>
      <Controller
        name="hoursPerWeek"
        control={control}
        render={({ field }) => (
          <input
            type="number"
            {...field}
            className="w-full mt-1 p-2 border rounded"
          />
        )}
      />
      {errors.hoursPerWeek && (
        <p className="text-red-600">{errors.hoursPerWeek.message}</p>
      )}
    </div>
  </div>
);

export default EmploymentStatus;
