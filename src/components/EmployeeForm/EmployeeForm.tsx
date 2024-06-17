import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ContractType, EmploymentType } from "../../types";
import PersonalInformation from "./PersonalInformation/PersonalInformation";
import ContactDetails from "./ContactDetails/ContactDetails";
import EmploymentStatus from "./EmploymentStatus/EmploymentStatus";

const employeeSchema = z.object({
  id: z.number().optional(),
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  mobileNumber: z.string().min(1, "Mobile number is required"),
  residentialAddress: z.string().optional(),
  contractType: z.nativeEnum(ContractType),
  startDate: z.string().min(1, "Start date is required"),
  finishDate: z.string().optional(),
  onGoing: z.boolean().optional(),
  employmentType: z.nativeEnum(EmploymentType),
  hoursPerWeek: z.preprocess(
    (value) => Number(value),
    z.number().min(1, "Must be at least 1 hour per week").optional()
  ),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;

interface EmployeeFormProps {
  onSubmit: (data: EmployeeFormData) => void;
  defaultValues?: EmployeeFormData;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: defaultValues || {
      id: undefined,
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      residentialAddress: "",
      contractType: ContractType.PERMANENT,
      startDate: "",
      finishDate: "",
      onGoing: false,
      employmentType: EmploymentType.FULL_TIME,
      hoursPerWeek: 40,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PersonalInformation control={control} errors={errors} />
      <ContactDetails control={control} errors={errors} />
      <EmploymentStatus control={control} errors={errors} />
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
          Save
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;

// export type EmployeeFormData = z.infer<typeof employeeSchema>;

// interface EmployeeFormProps {
//   onSubmit: (data: EmployeeFormData) => void;
//   defaultValues?: EmployeeFormData;
// }

// const EmployeeForm: React.FC<EmployeeFormProps> = ({
//   onSubmit,
//   defaultValues,
// }) => {
//   const {
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm<EmployeeFormData>({
//     resolver: zodResolver(employeeSchema),
//     defaultValues: defaultValues || {
//       id: undefined,
//       firstName: "",
//       middleName: "",
//       lastName: "",
//       email: "",
//       mobileNumber: "",
//       residentialAddress: "",
//       contractType: ContractType.PERMANENT,
//       startDate: "",
//       finishDate: "",
//       onGoing: false,
//       employmentType: EmploymentType.FULL_TIME,
//       hoursPerWeek: 40,
//     },
//   });

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div className="mb-4">
//         <label className="block text-gray-700">First Name</label>
//         <Controller
//           name="firstName"
//           control={control}
//           render={({ field }) => (
//             <input {...field} className="w-full mt-1 p-2 border rounded" />
//           )}
//         />
//         {errors.firstName && (
//           <p className="text-red-600">{errors.firstName.message}</p>
//         )}
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Middle Name</label>
//         <Controller
//           name="middleName"
//           control={control}
//           render={({ field }) => (
//             <input {...field} className="w-full mt-1 p-2 border rounded" />
//           )}
//         />
//         {errors.middleName && (
//           <p className="text-red-600">{errors.middleName.message}</p>
//         )}
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Last Name</label>
//         <Controller
//           name="lastName"
//           control={control}
//           render={({ field }) => (
//             <input {...field} className="w-full mt-1 p-2 border rounded" />
//           )}
//         />
//         {errors.lastName && (
//           <p className="text-red-600">{errors.lastName.message}</p>
//         )}
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Email</label>
//         <Controller
//           name="email"
//           control={control}
//           render={({ field }) => (
//             <input {...field} className="w-full mt-1 p-2 border rounded" />
//           )}
//         />
//         {errors.email && <p className="text-red-600">{errors.email.message}</p>}
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Mobile Number</label>
//         <Controller
//           name="mobileNumber"
//           control={control}
//           render={({ field }) => (
//             <input {...field} className="w-full mt-1 p-2 border rounded" />
//           )}
//         />
//         {errors.mobileNumber && (
//           <p className="text-red-600">{errors.mobileNumber.message}</p>
//         )}
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Residential Address</label>
//         <Controller
//           name="residentialAddress"
//           control={control}
//           render={({ field }) => (
//             <input {...field} className="w-full mt-1 p-2 border rounded" />
//           )}
//         />
//         {errors.residentialAddress && (
//           <p className="text-red-600">{errors.residentialAddress.message}</p>
//         )}
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Contract Type</label>
//         <Controller
//           name="contractType"
//           control={control}
//           render={({ field }) => (
//             <select {...field} className="w-full mt-1 p-2 border rounded">
//               <option value="PERMANENT">Permanent</option>
//               <option value="CONTRACT">Contract</option>
//             </select>
//           )}
//         />
//         {errors.contractType && (
//           <p className="text-red-600">{errors.contractType.message}</p>
//         )}
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Start Date</label>
//         <Controller
//           name="startDate"
//           control={control}
//           render={({ field }) => (
//             <input
//               type="date"
//               {...field}
//               className="w-full mt-1 p-2 border rounded"
//             />
//           )}
//         />
//         {errors.startDate && (
//           <p className="text-red-600">{errors.startDate.message}</p>
//         )}
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Finish Date</label>
//         <Controller
//           name="finishDate"
//           control={control}
//           render={({ field }) => (
//             <input
//               type="date"
//               {...field}
//               className="w-full mt-1 p-2 border rounded"
//             />
//           )}
//         />
//         {errors.finishDate && (
//           <p className="text-red-600">{errors.finishDate.message}</p>
//         )}
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">On Going</label>
//         <Controller
//           name="onGoing"
//           control={control}
//           render={({ field }) => (
//             <input
//               type="checkbox"
//               className="mt-1 p-2 border rounded"
//               checked={field.value || false}
//               onChange={(e) => field.onChange(e.target.checked)}
//             />
//           )}
//         />
//         {errors.onGoing && (
//           <p className="text-red-600">{errors.onGoing.message}</p>
//         )}
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Employment Type</label>
//         <Controller
//           name="employmentType"
//           control={control}
//           render={({ field }) => (
//             <select {...field} className="w-full mt-1 p-2 border rounded">
//               <option value="FULL_TIME">Full-time</option>
//               <option value="PART_TIME">Part-time</option>
//             </select>
//           )}
//         />
//         {errors.employmentType && (
//           <p className="text-red-600">{errors.employmentType.message}</p>
//         )}
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Hours per Week</label>
//         <Controller
//           name="hoursPerWeek"
//           control={control}
//           render={({ field }) => (
//             <input
//               type="number"
//               {...field}
//               className="w-full mt-1 p-2 border rounded"
//             />
//           )}
//         />
//         {errors.hoursPerWeek && (
//           <p className="text-red-600">{errors.hoursPerWeek.message}</p>
//         )}
//       </div>
//       <div className="flex justify-end">
//         <button
//           type="submit"
//           className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
//           Save
//         </button>
//       </div>
//     </form>
//   );
// };

// export default EmployeeForm;
