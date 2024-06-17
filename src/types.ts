export interface Employee {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  residentialAddress?: string;
  contractType: ContractType;
  startDate: string;
  finishDate?: string;
  onGoing?: boolean;
  employmentType: EmploymentType;
  hoursPerWeek?: number;
}

export enum ContractType {
  PERMANENT = "PERMANENT",
  CONTRACT = "CONTRACT",
}

export enum EmploymentType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
}