// src/components/EmployeeListItem/EmployeeListItem.tsx
import React from "react";
import { Employee } from "../../types";
import EditButton from "../Button/EditButton";
import RemoveButton from "../Button/RemoveButton";
import OpenButton from "../Button/OpenButton";

interface EmployeeListItemProps {
  employee: Employee;
  onEdit: (id: number) => void;
  onRemove: (id: number) => void;
  onView: (id: number) => void;
}

const EmployeeListItem: React.FC<EmployeeListItemProps> = ({
  employee,
  onEdit,
  onRemove,
  onView,
}) => {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <div>
        <h3 className="text-lg font-bold">{`${employee.firstName} ${employee.lastName}`}</h3>
        <p className="text-sm">
          {employee.contractType} - {employee.employmentType}
        </p>
        <p>✉ {employee.email}</p>
        <p>📱 {employee.mobileNumber}</p>
      </div>
      <div>
        {employee.id !== undefined && (
          <>
            <OpenButton onClick={() => onView(employee.id!)} className="mr-2">
              View
            </OpenButton>
            <EditButton onClick={() => onEdit(employee.id!)} className="mr-2">
              Edit
            </EditButton>
            <RemoveButton onClick={() => onRemove(employee.id!)}>
              Remove
            </RemoveButton>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeListItem;
