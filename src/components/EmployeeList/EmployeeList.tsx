import React from "react";
import { Employee } from "../../types";
import EmployeeListItem from "../EmployeeListItem/EmployeeListItem";

// simplified to just render the list of employees and lifted the edit, remove, and view actions to the parent component
interface EmployeeListProps {
  employees: Employee[];
  onEdit: (id: number) => void;
  onRemove: (id: number) => void;
  onView: (id: number) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({
  employees,
  onEdit,
  onRemove,
  onView,
}) => {
  return (
    <div className="flex flex-col items-stretch justify-evenly bg-gray-100">
      {employees.map((employee) => (
        <EmployeeListItem
          key={employee.id}
          employee={employee}
          onEdit={onEdit}
          onRemove={onRemove}
          onView={onView}
        />
      ))}
    </div>
  );
};

export default EmployeeList;