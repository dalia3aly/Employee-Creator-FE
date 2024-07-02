import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ContractType, EmploymentType } from "../../types";
import PersonalInformation from "./PersonalInformation/PersonalInformation";
import ContactDetails from "./ContactDetails/ContactDetails";
import EmploymentStatus from "./EmploymentStatus/EmploymentStatus";
import AddressComponent from "./AddressComponent/AddressComponent";

const employeeSchema = z.object({
  id: z.number().optional(),
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  mobileNumber: z.string().min(1, "Mobile number is required"),
  address: z
    .object({
      unitNumber: z.string().optional(),
      streetAddress: z.string().optional(),
      suburb: z.string().optional(),
      state: z.string().optional(),
      postcode: z.string().optional(),
      country: z.string().optional().default("Australia"),
    })
    .optional(),
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
      address: {
        unitNumber: "",
        streetAddress: "",
        suburb: "",
        state: "",
        postcode: "",
        country: "Australia",
      },
      contractType: ContractType.PERMANENT,
      startDate: "",
      finishDate: "",
      onGoing: false,
      employmentType: EmploymentType.FULL_TIME,
      hoursPerWeek: 40,
    },
  });

  return (
    <div className="flex flex-col items-center justify-start min-w-8 min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 min-w-96">
        <PersonalInformation control={control} errors={errors} />
        <ContactDetails control={control} errors={errors} />
        <EmploymentStatus control={control} errors={errors} />
        <div className="mt-4">
          <AddressComponent control={control} errors={errors} />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
