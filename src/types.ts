export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber?: string;
  address?: Address;
  contractType: ContractType;
  startDate: string;
  finishDate?: string;
  onGoing?: boolean;
  employmentType: EmploymentType;
  hoursPerWeek?: number;
}

export interface Address {
  unitNumber?: string;
  streetAddress: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
}

export enum ContractType {
  PERMANENT = "PERMANENT",
  CONTRACT = "CONTRACT",
}

export enum EmploymentType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
}