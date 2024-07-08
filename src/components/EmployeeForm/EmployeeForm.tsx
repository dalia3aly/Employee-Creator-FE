import React from "react";
import { useForm, FormProvider } from "react-hook-form";
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
  mobileNumber: z.string().min(10, "Invalid mobile number").optional(),
  address: z
    .object({
      unitNumber: z.string().optional(),
      streetAddress: z.string(),
      suburb: z.string(),
      state: z.string(),
      postcode: z.string(),
      country: z.string().default("Australia"),
    })
    .optional(),
  contractType: z.nativeEnum(ContractType),
  startDate: z.string().min(1, "Start date is required"),
  finishDate: z.union([z.string(), z.null()]).optional(),
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
  const methods = useForm<EmployeeFormData>({
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
      finishDate: null,
      onGoing: false,
      employmentType: EmploymentType.FULL_TIME,
      hoursPerWeek: 40,
    },
  });

   const handleSubmit = (data: EmployeeFormData) => {
     if (data.onGoing) {
       data.finishDate = null;
     }
     onSubmit(data);
   };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col items-center justify-start min-w-8 min-h-screen bg-white">
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="bg-white rounded px-8 pt-6 pb-8 mb-4 min-w-96">
          <PersonalInformation
            control={methods.control}
            errors={methods.formState.errors}
          />
          <ContactDetails
            control={methods.control}
            errors={methods.formState.errors}
          />
          <EmploymentStatus
            control={methods.control}
            errors={methods.formState.errors}
          />
          <div className="mt-4">
            <AddressComponent
              control={methods.control}
              errors={methods.formState.errors}
            />
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
    </FormProvider>
  );
};

export default EmployeeForm;
